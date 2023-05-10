import commentRepo from "./comment.repo";
import { IComment } from "./comment.type";
import { comment_responses } from "./comment.response";
import { Types } from "mongoose";
import tournamentService from "../tournaments/tournament.service";
import { createPipeline } from "../../utility/pipeline";
import notificationService from "../notifications/notification.service";

//CREATE NEW COMMENT
const createComment = async(comment:IComment)=>{
    let tournament = await tournamentService.findTournament({_id : comment.tournamentId});

    const record = await commentRepo.create(comment);
    if(!record) throw comment_responses.comment_not_added;

    const notification = await notificationService.createNotification(
        {
            receiverId : comment.receiverId,
            tournamentId : new Types.ObjectId(comment.tournamentId),
            notification : "You have a new comment"
        }
    )
    return notification;
} 

//FIND A COMMENT
const findComment = async(filter:Partial<IComment>) => {
    const foundcomment = await commentRepo.findOne(filter);

    if(!foundcomment) throw comment_responses.comment_not_found;
    return foundcomment;
}

//VIEW ALL COMMENTS
const ViewAllComments = async(query:any)=>{
    const {senderId,receiverId,tournamentId,...filters} = query

    const pipeline = createPipeline(filters);

    const aggregate = [];

    if(senderId){
        aggregate.push({
            $match : {
                senderId : new Types.ObjectId(senderId)
            }
        })
    }
    if(receiverId){
        aggregate.push({
            $match : {
                senderId : new Types.ObjectId(receiverId)
            }
        })
    }
    if(tournamentId){
        aggregate.push({
            $match : {
                tournamentId : new Types.ObjectId(tournamentId)
            }
        })
    }

    aggregate.push(...pipeline)

    const result = await commentRepo.find(aggregate);

    return result;
}

//UPDATE A COMMENT
const updateComment = async(commentId:string,updateObject:object)=>{
    const updated = await commentRepo.updateOne(
        {_id:new Types.ObjectId(commentId)},
        {$set: updateObject}
    )

    if(!updated) throw comment_responses.comment_not_updated;
    return comment_responses.comment_updated;
}

//DELETE A COMMENT
const deleteComment = async(commentId:string)=>{
    const deleted = await commentRepo.updateOne(
        {_id:new Types.ObjectId(commentId)},
            {$set : {
                isDeleted : true
            }}
        )
    
    if(!deleted) throw comment_responses.comment_not_deleted;

    return comment_responses.comment_deleted;
    
}

//CREATE REPLY
const createReply = async(commentId:string,reply:object) => {
    const comment = await findComment({_id : new Types.ObjectId(commentId)});
    
    const replyAdded = await commentRepo.updateOne(
        {_id : new Types.ObjectId(commentId)},
        {$push : {
            replies : reply
        }}
    )
    
    if(!replyAdded) throw comment_responses.reply_not_added;

    const notification = await notificationService.createNotification(
        {
            receiverId : comment.receiverId,
            tournamentId : new Types.ObjectId(comment.tournamentId),
            notification : "You have a reply to your previous comment"
        }
    )
    return notification;
}

//FLAG COMMENT BY MODERATOR
const flagComment = async(commentId:string,reason:string) => {
    const commentFlagged = await commentRepo.updateOne(
        {_id : new Types.ObjectId(commentId)},
        {$set : {
            isFlagged : true,
            reason : reason
        }}
    )

    if(commentFlagged.modifiedCount === 0){
        const replyFlagged = await commentRepo.updateOne(
            {"replies._id" : commentId},
            {$set : {
                "replies.$.flagReply" : true,
                "replies.$.reason" : reason
            }}
        )
    }

    return comment_responses.comment_flagged;
}

export default {
    createComment,
    updateComment,
    findComment,
    ViewAllComments,
    deleteComment,
    createReply,
    flagComment
}