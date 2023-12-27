import { Request, Response, Router } from "express";
import { EvaluationController } from "../controllers/EvaluationController";

const router = Router();
const evaluationController = new EvaluationController;

router.get('/evaluation', (req:Request, res:Response) => {
    evaluationController.getAllEvaluations(req,res);
})

router.post('/evaluation', (req:Request, res:Response) => {
    evaluationController.postNewEvaluation(req,res);
})

export {router};