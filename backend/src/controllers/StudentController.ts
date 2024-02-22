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
           // verificar existencia do guardian
            const classeId = req.body.class;
            const classInstance = await classServices.findOneClass(classeId);
            // console.log(classInstance);
            
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
            return res.status(200).json(students);
        } catch (error) {
            console.log(error.message);
            
        }
    }


    async getBirthdayStudent(req: Request, res: Response){
        try {
            console.log(req.params.id);
            const students = await studentServices.getSameClassStudents(req.params.id);
            // console.log(students);
            
            const birthdayStudent = students[0].filter((student)=>{
                const day = student.birth_date.getDate();
                const month = student.birth_date.getMonth();
                const today = new Date().getDate();
                const todayMonth = new Date().getMonth();

                if (day ==today && month == todayMonth) {
                    return student;
                } else{
                    return
                }
            })
            return res.status(200).json(birthdayStudent);
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }

}