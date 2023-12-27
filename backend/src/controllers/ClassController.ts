import json, { Request,Response }  from "express";
import classRepository from "../services/classServices";
import { Class } from "../entity/Class";

export class ClassController {
    async getAllClasses(req:Request,res:Response){
        try {
            const classes =  await classRepository.find();
            return res.status(200).json(classes)
        } catch (error) {
            return res.status(401).json(error)
            
        }
    }

    async postNewClass(req:Request,res:Response){
        try{
            let newClass = new Class
            newClass.name = req.body.name;
            newClass.capacity = req.body.capacity;
            newClass.shift = req.body.shift;
            newClass.user = req.body.user;
            newClass.student = req.body.student;
            await classRepository.save(newClass);
            return res.status(200).json();
        } catch(error) {
            return res.status(500).json({error: "Internal Server Error", details: error.message})
        }
    }
}