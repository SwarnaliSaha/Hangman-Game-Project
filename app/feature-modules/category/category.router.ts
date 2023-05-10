import { Router,Request,Response,NextFunction } from "express";
import { ResponseHandler } from "../../utility/response-handler";
import categoryService from "./category.service";
import { CATEGORY_RESPONSES } from "./category.response";
import { ADD_CATEGORY_VALIDATOR, DELETE_CATEGORY_VALIDATOR, UPDATE_CATEGORY_VALIDATOR, VIEW_CATEGORY_VALIDATOR } from "./category.validator";

const router = Router();

//ADD NEW CATEGORY
router.post('/',ADD_CATEGORY_VALIDATOR,(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = categoryService.createCategory(req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//GET ALL CATEGORIES
router.get('/',VIEW_CATEGORY_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=> {
    try {
        const query = req.query;
        const result = await categoryService.ViewAllCategories(query);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

//UPDATE CATEGORY
router.patch('/:id',UPDATE_CATEGORY_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const categoryId = req.params.id;
        const result = await categoryService.updateCategory(categoryId,req.body);

        res.send(result);
    } 
    catch (error) {
        next(error);
    }
})

//DELETE CATEGORY
router.delete('/:id',DELETE_CATEGORY_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const categoryId = req.params.id;
        const result = await categoryService.deleteCategory(categoryId);

        res.send(result);
    } 
    catch (error) {
        next(error);
    }
})

export default router;