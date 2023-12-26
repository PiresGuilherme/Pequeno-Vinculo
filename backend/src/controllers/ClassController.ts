import json  from "express";
import classRepository from "../services/classServices";

export class ClassController {
    async getAllClasses(req,res){
        try {
            let Classes =  await classRepository.find();
            return res.status(200).json(Classes)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}