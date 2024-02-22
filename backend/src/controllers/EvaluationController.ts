import { Request, Response } from "express";
// import evaluationRepository from "../services/evaluationServices";
import { Evaluation } from "../entity/Evaluation";
import { EvaluationServices } from "../services/evaluationServices";
import { StudentServices } from "../services/studentServices";
import { NotificationController } from "./NotificationController";


export class EvaluationController {
    async getAllEvaluations(req: Request, res: Response) {
        try {
            const evaluationServices = new EvaluationServices;

            let allEvaluations = await evaluationServices.getAllEvaluations();
            return res.status(200).json(allEvaluations);
        } catch (error) {
            return res.status(400).json({ error: "Not found", details: error.message })
        }

    }

    async postNewEvaluation(req: Request, res: Response) {
        try {
            const studentServices = new StudentServices;
            const evaluationServices = new EvaluationServices;


            let student = await studentServices.getStudent(req.body.student)
            if (!student) {
                return res.status(404).json({ error: 'Not Found', details: 'Estudante não encontrado.' });
            };
            let newEvaluation: Evaluation = req.body;
            newEvaluation.student = student;

            newEvaluation.note = req.body.note;

            await studentServices.earnCoin(student.id,req.body.note)
            await evaluationServices.newEvaluation(newEvaluation);

            const notificationController = new NotificationController();
            await notificationController.postNotification(student, `Foi criado uma nova avaliação para o aluno ${student.name}`,)
            return res.status(201).json(newEvaluation);
        } catch (error) {
            console.log(error);

            return res.status(400).json({ error: "Bad Request", details: error.message })
        }
    }

    async stundentEvaluations(req: Request, res: Response) {
        try {
            const evaluationServices = new EvaluationServices;

            const stundentEvaluations = await evaluationServices.findStudentEvaluations(req.params.id);
            return res.status(200).json(stundentEvaluations);
        } catch (error) {
            return res.status(404).json({ error: "Not Found", details: error.message })
        }
    }

    async averageEvaluations(req: Request, res: Response) {
        try {
            const evaluationServices = new EvaluationServices;

            const average = await evaluationServices.averageEvaluations(req.params.id)
            return res.status(200).json(average)
        } catch (error) {
            return res.status(500).json()
        }
    }
}