import tournamentRepo from "./tournament.repo";
import { ITournament } from "./tournament.type";
import { tournament_responses } from "./tournament.response";
import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { createPipeline } from "../../utility/pipeline";
import notificationService from "../notifications/notification.service";
import userService from "../users/user.service";
import wordService from "../words/word.service";
import categoryService from "../category/category.service";


const updateOne = (filter: FilterQuery<ITournament>, update: UpdateQuery<ITournament>) => {
    return tournamentRepo.updateOne(filter, update)
}

//CREATE A NEW TOURNAMENT
const createTournament = async(tournament:ITournament)=>{
    const record = await tournamentRepo.create(tournament);

    if(!record) throw tournament_responses.tournament_not_created;
    return tournament_responses.tournament_created
} 

//FIND A TOURNAMENT
const findTournament = async(filter:Partial<ITournament>) => {
    const foundTournament = await tournamentRepo.findOne(filter);

    if(!foundTournament) throw tournament_responses.tournament_not_found;
    return foundTournament;
}

//VIEW THE LIST OF ALL TOURNAMENTS
const ViewAllTournaments = async(query:any)=>{
    const pipeline = createPipeline(query);

    const result = await tournamentRepo.find(pipeline);

    return result;
}

//UPDATE TOURNAMENT WITHOUT THE ARRAYS
const updateTournament = async(tournamentId:string,updateObject:object)=>{
    const updated = await tournamentRepo.updateOne(
        {_id:new Types.ObjectId(tournamentId)},
        {$set: updateObject}
    )

    if(!updated) throw tournament_responses.tournament_not_updated;
    return tournament_responses.tournament_updated;
}

//UPDATE CATEGORY AND WORDS ARRAY
const updateTournamentArrays = async(tournamentId:string,wordId:string = "",categoryId:string = "",action:string) => {
    const tournament = await findTournament({_id : tournamentId});

    if(action == "addWords" && wordId !== ""){
        const wordFromGlobalDb = await wordService.findWord({_id :new Types.ObjectId( wordId)});

        const updateTournament = await tournamentRepo.updateOne(
            {_id:tournamentId},
            {$push : {
                words : wordId
            }}
        )

    }

    if(action == "deleteWord" && wordId !==""){
        const updateTournament = await tournamentRepo.updateOne(
            {_id : tournamentId},
            {$pull : {
                words : wordId
            }}
        )
    }

    if(action == "addCategory" && categoryId !==""){
        const categoryFromDb = await categoryService.findCategory({_id : categoryId});
        
        const updateTournament = await tournamentRepo.updateOne(
            {_id : categoryId},
            {$push : {
                category : categoryId
            }}
        )
    }

    if(action == "deleteCategory" && categoryId !==""){
        const tournament = await findTournament({_id : tournamentId});
        await tournamentRepo.updateOne(
            {_id : tournamentId},
            {$pull : {
                category : categoryId
            }}
        )

        for(let word of tournament.words){
            let wordFromDb = await wordService.findWord({_id : word});
            let category = wordFromDb.category;

            if(category.length>1){
                for(let ele of category){
                    let findIndex = tournament.category.findIndex(item => item.toString() == ele.toString());
                    if(findIndex == -1){
                        await tournamentRepo.updateOne(
                            {_id : tournamentId},
                            {$pull : {
                                words : word
                            }}
                        )
                    }
                }
            }
            if(category.length==1){
                if(category[0].toString() === categoryId.toString()){
                    await tournamentRepo.updateOne(
                        {_id : tournamentId},
                        {$pull : {
                            words : word
                        }}
                    )
                }
            }

        }
    }
    return tournament_responses.tournament_updated
}

//DELETE A TOURNAMENT
const deleteTournament = async(tournamentId:string)=>{
    const tournament = await findTournament({_id:tournamentId});

    if(tournament.adminApproval === "pending"){
        const deleted = await tournamentRepo.updateOne(
            {_id:new Types.ObjectId(tournamentId)},
            {$set : {
                isDeleted : true
            }}
        )
        return tournament_responses.tournament_deleted;
    }

    throw tournament_responses.tournament_not_deleted;
    
}

//ADMIN APPROVAL FOR A TOURNAMENT
const adminApproval = async(tournamentId : string , status : string) => {
    if(status === "verified"){
        const updatedTournament = await updateTournament(tournamentId,
            {
                adminApproval:status,
                ongoing : true
            });
        let tournament = await findTournament({_id : tournamentId});
        let creatorId = tournament.creatorId;

        const notification = await notificationService.createNotification({
            receiverId : creatorId,
            tournamentId : new Types.ObjectId(tournamentId),
            notification : "Admin has approved your tournment"
        })
    
        return notification;
    }

    if(status === "rejected"){
        const updatedTournament = await updateTournament(tournamentId,{adminApproval:status});

        let tournament = await findTournament({_id : tournamentId});
        let creatorId = tournament.creatorId;

        const notification = await notificationService.createNotification({
            receiverId : creatorId,
            tournamentId : new Types.ObjectId(tournamentId),
            notification : "Admin has rejected your tournment"
        })
    
        return notification;
    }
}

//PLAY ANY TOURNAMENT
const playTournament = async(tournamentId:string,playerId:string,mistakes:number,time:string)=> {
    const tournament = await findTournament({_id : tournamentId});

    if(tournament.adminApproval=="verified" && tournament.ongoing==true){
        const totalWords = tournament.words.length;
        const total = (totalWords*10);

        const score = (total-(mistakes*10));

        const updateUser = await userService.updateOne(
            {_id : playerId},
            {
                $push : {
                tournamentsPlayed : {
                    tournamentId : tournamentId,
                    timeTaken : time,
                    score : score
                }
            },
                $set : {
                    score : score
            }
        },   
        )
        return updateUser;
    }

    throw tournament_responses.cannot_play;
}

//CREATOR CLOSES HIS TOURNAMENT
// const closeTournament = async(tournamentId : string)=>{
//     const tournament = await findTournament({_id : tournamentId});

//     await updateTournament(tournamentId,{ongoing : false});

//     const browser = puppeteer.launch();

// }

export default {
    updateOne,
    createTournament,
    ViewAllTournaments,
    updateTournament,
    deleteTournament,
    findTournament,
    adminApproval,
    playTournament,
    updateTournamentArrays
}