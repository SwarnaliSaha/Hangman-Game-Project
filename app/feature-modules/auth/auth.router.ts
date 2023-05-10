import {Router , Request,Response,NextFunction} from "express"
import authService from "./auth.service";
import { ResponseHandler } from "../../utility/response-handler";
import { LOGIN_VALIDATOR, REFRESH_TOKEN_VALIDATOR, REGISTER_USER_VALIDATOR } from "./auth.validator";

const router = Router();

router.post('/registerUser',REGISTER_USER_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await authService.registerUser(req.body);
        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

router.post('/login',LOGIN_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await authService.login(req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

router.post('/generateNewToken',REFRESH_TOKEN_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await authService.refreshToken(req.body.refreshToken);
        
        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

export default router;