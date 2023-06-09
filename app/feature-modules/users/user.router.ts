import { Router,Request,Response,NextFunction } from "express";
import { ResponseHandler } from "../../utility/response-handler";
import userService from "./user.service";

const router = Router();

//VIEW ALL USERS
router.get('/',async(req:Request,res:Response,next:NextFunction)=> {
    try {
        const query = req.query;
        const result = await userService.ViewAllUsers(query);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

//UPDATE USER BY ADMIN
router.patch('/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = req.params.id;
        const result = await userService.updateUser(userId,req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//DELETE USER BY ADMIN
router.delete('/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = req.params.id;
        const result = await userService.deleteUser(userId);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//MODERATOR ACCESS GIVEN BY THE ADMIN
router.patch('/moderatorAccess/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = req.params.id;
        const result = await userService.mderatorAccess(userId);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error);
    }
})

export default router;