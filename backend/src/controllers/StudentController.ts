import { Request, Response } from "express";
// import studentRepository from "../services/studentServices";
import { Student } from "../entity/Student";
import { StudentServices } from "../services/studentServices";
import { ClassServices } from "../services/classServices";

const studentServices = new StudentServices;
const classServices = new ClassServices;

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
            const classeId = req.body.class;
            const classInstance = await classServices.findOneClass(classeId);
            console.log(classInstance);
            
            if (classInstance) {
                newStudent.classe = classInstance;
            }
            // newStudent.coin = req.body.coin;
            // newStudent.user= req.body. userId;
            await studentServices.newStudent(newStudent);
            return res.status(200).json(newStudent);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    async getStudent(req: Request, res: Response) {
        try {
            let student = await studentServices.getStudent(req.params.id)
            return res.status(200).json(student);
        } catch (error) {
            console.log(error.message);
            
        }
    }

    async getSameClassStudents(req: Request, res: Response){
        try {            
            const students = await studentServices.getSameClassStudents(req.body.classId)
            //students
            // console.log(students[0]);
            //count
            // console.log(students[1]);
            // console.log(students);
            
            return res.status(200).json(students);
        } catch (error) {
            console.log(error.message);
            
        }
    }

}