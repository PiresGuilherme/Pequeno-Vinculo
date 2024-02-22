import { Request, Response, Router } from "express";
import { EvaluationController } from "../controllers/EvaluationController";
import { NotificationController } from "../controllers/NotificationController";

const router = Router();

router.get('/evaluation', (req:Request, res:Response) => {
    const evaluationController = new EvaluationController();

    evaluationController.getAllEvaluations(req,res);
})

router.post('/evaluation', (req:Request, res:Response) => {
    const evaluationController = new EvaluationController();

    evaluationController.postNewEvaluation(req,res);

})

router.get('/evaluation/student/:id(\\d+)',(req:Request, res:Response) => {
    const evaluationController = new EvaluationController();

    evaluationController.stundentEvaluations(req,res);
})

router.get('/evaluate/average/:id(\\d+)', (req:Request, res:Response) => {
    const evaluationController = new EvaluationController();
    evaluationController.averageEvaluations(req,res);
})

export {router};