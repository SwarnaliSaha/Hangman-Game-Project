import {Router , Request,Response,NextFunction} from "express"
import { ResponseHandler } from "../../utility/response-handler"
import tournamentService from "./tournament.service"
import { CREATE_TOURNAMENT_VALIDATOR, DELETE_TOURNAMENT_VALIDATOR, PLAY_TOURNAMENT_VALIDATOR, UPDATE_TOURNAMENT_NONARRAY_VALIDATOR, VERIFY_TOURNAMENT_VALIDATOR } from "./tournament.validator";

const router = Router();

//CREATOR CREATES A TOURNAMENT
router.post('/',CREATE_TOURNAMENT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await tournamentService.createTournament(req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        console.log(error)
        next(error);
    }
})

//VIEW ALL TOURNAMENTS
router.get('/',async(req:Request,res:Response,next:NextFunction)=> {
    try {
        const query = req.query;
        const result = await tournamentService.ViewAllTournaments(query);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})



//CREATOR CAN DELETE A TOURNAMENT
router.delete('/:id',DELETE_TOURNAMENT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const tournamentId = req.params.id;
        const result = await tournamentService.deleteTournament(tournamentId);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN APPROVE OR REJECT OR SEND OUT COMMENT ON ANY TOURNAMENT
router.patch('/verification/:id',VERIFY_TOURNAMENT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const tournamentId = req.params.id;
        const result = await tournamentService.adminApproval(tournamentId,req.body.status);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//PLAY A TOURNAMNET
router.patch('/play/:id',PLAY_TOURNAMENT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const tournamentId = req.params.id;
        const {playerId,mistakes,time} = req.body;
        const result = await tournamentService.playTournament(tournamentId,playerId,mistakes,time);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

//CREATOR CAN UPDATE HIS TOURNAMENT (FOR NON-ARRAY FIELDS)
router.patch('/:id',UPDATE_TOURNAMENT_NONARRAY_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const tournamentId = req.params.id;
        const result = await tournamentService.updateTournament(tournamentId,req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//CREATOR CAN UPDATE HIS TOURNAMENT (FOR ARRAYS - WORDS AND CATEGORIES)
router.patch('/updateWordsOrCategory/:id',async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const tournamentId = req.params.id;
        const {wordId,categoryId,action} = req.body;
        const result = await tournamentService.updateTournamentArrays(tournamentId,wordId,categoryId,action);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})
export default router;