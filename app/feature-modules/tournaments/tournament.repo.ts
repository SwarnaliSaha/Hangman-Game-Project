import { ITournament } from "./tournament.type";
import { TournamentModel } from "./tournament.schema";
import { FilterQuery, UpdateQuery } from "mongoose";

const create = (tournament:ITournament)=>TournamentModel.create(tournament);

const updateOne = async (filter:FilterQuery<ITournament>,update:UpdateQuery<ITournament>) => {
    return TournamentModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<ITournament>) => {
    return await TournamentModel.findOne({
        ...filters,
        isDeleted:false
    })   
}

const find = (pipeline:any) => TournamentModel.aggregate(pipeline);

export default {
    create,
    updateOne,
    findOne,
    find
}