import {Router , Request,Response,NextFunction} from "express"
import { ResponseHandler } from "../../utility/response-handler"
import commentService from "./comment.service";
import { ADD_COMMENT_VALIDATOR, DELETE_COMMENT_VALIDATOR, FLAG_COMMENT_VALIDATOR, POST_REPLY_VALIDATOR, VIEW_ALL_COMMENTS } from "./comment.validator";

const router = Router();

//POST A NEW COMMENT
router.post('/',ADD_COMMENT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await commentService.createComment(req.body);
        
        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//POST REPLY TO A COMMENT
router.post('/reply',POST_REPLY_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const commentId = req.body.commentId;
        const result = await commentService.createReply(commentId,req.body.reply);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//VIEW ALL COMMENTS
router.get('/',VIEW_ALL_COMMENTS,async(req:Request,res:Response,next:NextFunction)=> {
    try {
        const query = req.query;
        const result = await commentService.ViewAllComments(query);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

//DELETE COMMENT BY MODERATOR
router.delete('/:id',DELETE_COMMENT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const commentId = req.params.id;
        const result = await commentService.deleteComment(commentId);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

//UPDATE A COMMENT

//FLAG COMMENT BY MODERATOR
router.patch('/:id',FLAG_COMMENT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const commentId = req.params.id;
        const reason = req.body.reason;

        const result = await commentService.flagComment(commentId,reason);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

export default router;

