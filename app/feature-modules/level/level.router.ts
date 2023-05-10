import { Router,Request,Response,NextFunction } from "express";
import { ResponseHandler } from "../../utility/response-handler";
import levelService from "./level.service";
import { ADD_LEVEL_VALIDATION, DELETE_LEVEL_VALIDATOR, UPDATE_LEVEL_VALIDATOR, VIEW_ALL_LEVELS_VALIDATOR } from "./level.validator";

const router = Router();

//ADD NEW LEVEL
router.post('/',ADD_LEVEL_VALIDATION,(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = levelService.createLevel(req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//UPDATE LEVEL
router.patch('/:id',UPDATE_LEVEL_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const levelId = req.params.id;
        const result = await levelService.updateLevel(levelId,req.body);

        res.send(result);
    } 
    catch (error) {
        next(error);
    }
})

//DELETE LEVEL
router.delete('/:id',DELETE_LEVEL_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const levelId = req.params.id;
        const result = await levelService.deleteLevel(levelId);

        res.send(result);
    } 
    catch (error) {
        next(error);
    }
})

router.get('/',VIEW_ALL_LEVELS_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=> {
    try {
        const query = req.query;
        const result = await levelService.ViewAllLevels(query);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

export default router;