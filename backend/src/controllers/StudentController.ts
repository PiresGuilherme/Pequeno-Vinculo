import { Request, Response } from "express";
// import studentRepository from "../services/studentServices";
import { Student } from "../entity/Student";
import {StudentServices} from "../services/studentServices";

const studentServices = new StudentServices

export class StudentController {
    async getAllStudents(req: Request, res: Response) {
        try {
            let allStudents = await studentServices.getAllStudents();
            return res.status(200).json(allStudents);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }

    }

    async postNewStudent(req: Request, res: Response) {
        try {
            let newStudent: Student = req.body;
            // let newStudent = new Student;
            // newStudent.name = req.body.name;
            // newStudent.last_name = req.body.last_name;
            // newStudent.birth_date = req.body.birth_date;
            // newStudent.document = req.body.document;
            // newStudent.class = req.body.classId;
            // newStudent.coin = req.body.coin;
            // newStudent.user= req.body. userId;
            await studentServices.newStudent(newStudent);
            return res.status(200).json(newStudent);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }

    }
}