import wordService from "./word.service";
import { Router,Request,Response,NextFunction } from "express";
import { ResponseHandler } from "../../utility/response-handler";

const router = Router();

//CREATE NEW WORD
router.post('/',(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = wordService.createWord(req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//VIEW ALL WORDS
router.get('/',async(req:Request,res:Response,next:NextFunction)=> {
    try {
        const query = req.query;
        const result = await wordService.ViewAllWords(query);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

//UPDATE WORD
router.patch('/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const wordId = req.params.id;
        const result = await wordService.updateWord(wordId,req.body);

        res.send(result);
    } 
    catch (error) {
        next(error);
    }
})

//DELETE WORD
router.delete('/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const wordId = req.params.id;
        const result = await wordService.deleteWord(wordId);

        res.send(result);
    } 
    catch (error) {
        next(error);
    }
})

export default router;