import json, { Request, Response } from "express";
// import classRepository from "../services/classServices";
import { Class } from "../entity/Class";
import { ClassServices } from "../services/classServices";
import { UserServices } from "../services/userServices";
import { StudentServices } from "../services/studentServices";
const classServices = new ClassServices;
export class ClassController {
    async getAllClasses(req: Request, res: Response) {
        try {
            const classes = await classServices.getAllClasses();
            return res.status(200).json(classes)
        } catch (error) {
            return res.status(401).json(error)

        }
    }

    async postNewClass(req: Request, res: Response) {
        try {
            let newClass: Class = req.body
            const userService = new UserServices()
            let user = await userService.getUserById(req.body.user)
            newClass.user = user
            await classServices.newClass(newClass);
            return res.status(200).json();
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message })
        }
    }
    async findOneClass(req: Request, res: Response) {
        try {
            const classroom = await classServices.findOneClass(req.params.id);
            return res.status(200).json(classroom);
        } catch (error) {
            return res.status(404).json({ error: "Not Found", details: error.message })
        }
    }

    async findClassroomTeacher(req: Request, res: Response) {
        try {
            const classroomTeacher = await classServices.findTeacher(req.body.userId);
            return res.status(200).json(classroomTeacher);
        } catch (error) {
            return res.status(404).json({ error: "Not Found", details: error.message })
        }
    }

    async findBestClasses(req: Request, res: Response) {
        try {
            const studentServices = new StudentServices();
            const classId= req.params.id
            const response = await studentServices.getSameClassStudents(classId)
            const students = response[0]
            const classTotalCoin = await students.reduce((accumulator, student) => {
                return accumulator + student.coin;
            },0)
            const classAverageCoin = classTotalCoin/response[1];
            console.log(classTotalCoin);
            return res.status(200).json(classAverageCoin)
        } catch (error) {

        }
    }
}