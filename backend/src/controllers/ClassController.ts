import json, { Request,Response }  from "express";
// import classRepository from "../services/classServices";
import { Class } from "../entity/Class";
import { ClassServices } from "../services/classServices";
import { UserServices } from "../services/userServices";
import { User } from "../entity/User";
const classServices = new ClassServices;
export class ClassController {
    async getAllClasses(req:Request,res:Response){
        try {
            const classes =  await classServices.getAllClasses();
            return res.status(200).json(classes)
        } catch (error) {
            return res.status(401).json(error)
            
        }
    }

    async postNewClass(req:Request,res:Response){
        try{
            let newClass : Class = req.body
            // let newClass = new Class
            // newClass.name = req.body.name;
            // newClass.capacity = req.body.capacity;
            // newClass.shift = req.body.shift;
            // newClass.user = req.body.user;
            // newClass.student = req.body.student;
            const userService = new UserServices()
            let user = await userService.getUserById(req.body.user)
            // console.log(user);
            newClass.user = user
            await classServices.newClass(newClass);
            return res.status(200).json();
        } catch(error) {
            return res.status(500).json({error: "Internal Server Error", details: error.message})
        }
    }
    async findOneClass(req:Request,res:Response){
        try {
            const classroom = await classServices.findOneClass(req.body.classId);
            return res.status(200).json(classroom);
        } catch (error) {
            return res.status(404).json({error: "Not Found", details: error.message})
        }
    }

    async findClassroomTeacher(req:Request,res:Response){
        try {
            const classroomTeacher = await classServices.findTeacher(req.body.userId);
            return res.status(200).json(classroomTeacher);
        } catch (error) {
            return res.status(404).json({error: "Not Found", details: error.message})
        }
    }
}