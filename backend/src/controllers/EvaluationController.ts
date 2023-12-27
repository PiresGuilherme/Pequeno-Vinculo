import { Request, Response } from "express";
import evaluationRepository from "../services/evaluationServices";
import { Evaluation } from "../entity/Evaluation";

export class EvaluationController {
    async getAllEvaluations(req:Request, res:Response){
        try {
            let allEvaluations = await evaluationRepository.find();
            return res.status(200).json(allEvaluations);
        } catch (error) {
            return res.status(400).json({error:"Not found", details : error.message})
        }
        
    }

    async postNewEvaluation(req:Request,res:Response){
        try {
            let newEvaluation = new Evaluation;
            newEvaluation.student = req.body.student;
            newEvaluation.evaluation_date = req.body.evaluation_date;
            newEvaluation.note = req.body.note;
            await evaluationRepository.save(newEvaluation);
            return res.status(201).json(newEvaluation);     
        } catch (error) {
            return res.status(400).json({error:"Bad Request", details: error.message})
        }
    }
}