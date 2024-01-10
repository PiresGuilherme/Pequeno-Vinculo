import { Request, Response } from "express";
// import evaluationRepository from "../services/evaluationServices";
import { Evaluation } from "../entity/Evaluation";
import { EvaluationServices } from "../services/evaluationServices";
import { StudentServices } from "../services/studentServices";

const evaluationServices = new EvaluationServices;
const studentServices = new StudentServices;

export class EvaluationController {
    async getAllEvaluations(req:Request, res:Response){
        try {
            let allEvaluations = await evaluationServices.getAllEvaluations();
            return res.status(200).json(allEvaluations);
        } catch (error) {
            return res.status(400).json({error:"Not found", details : error.message})
        }
        
    }

    async postNewEvaluation(req:Request,res:Response){
        try {
            // let newEvaluation = new Evaluation;
            // newEvaluation.student = req.body.student;
            let student = await studentServices.getStudent(req.body.studentId)
            // newEvaluation.evaluation_date = req.body.evaluation_date;
            if (!student){
                return res.status(404).json({ error: 'Not Found', details: 'Estudante não encontrado.' });
            };
            console.log(student);
            let newEvaluation : Evaluation = req.body;
            newEvaluation.student = student;
            console.log(newEvaluation);
            
            // newEvaluation.note = req.body.note;
            await evaluationServices.newEvaluation(newEvaluation);
            return res.status(201).json(newEvaluation);     
        } catch (error) {
            return res.status(400).json({error:"Bad Request", details: error.message})
        }        
    } 
    
    async stundentEvaluations(req:Request,res:Response){
        try {
            const stundentEvaluations = await evaluationServices.findStudentEvaluations(req.body.studentId);
            return res.status(200).json(stundentEvaluations);
        } catch (error) {
            return res.status(404).json({error: "Not Found", details: error.message})
        }
    }
}