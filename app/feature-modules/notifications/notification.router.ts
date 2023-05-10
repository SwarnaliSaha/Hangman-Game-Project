import {Router , Request,Response,NextFunction} from "express"
import { ResponseHandler } from "../../utility/response-handler"
import notificationService from "./notification.service"
import { VIEW_NOTIFICATION_VALIDATOR } from "./notification.validator";

const router = Router();

//VIEW ALL NOTIFICATIONS
router.get('/',VIEW_NOTIFICATION_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const result = await notificationService.ViewAllNotifications(query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})