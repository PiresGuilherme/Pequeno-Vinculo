import { Request, Response } from "express";
import { AttendanceServices } from "../services/attendanceServices";
import { StudentServices } from "../services/studentServices";

export class AttendanceController{
    async getStudentPresences(req:Request,res:Response){
        try {
            const attandanceServices = new AttendanceServices();
            const studentServices = new StudentServices();
            const student = await studentServices.getStudent(req.body.user)            
            if(student == null){
                return res.status(404).json();
            }
            const response  = await attandanceServices.getStudentPresences(student.id);
            
             return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async postStudentPresence(req:Request,res:Response){
        try {
            const attandanceServices = new AttendanceServices();
            const studentServices = new StudentServices();
            const student = await studentServices.getStudent(req.body.student)
            
            if(student == null){
                return res.status(404).json();
            }
            const response = await attandanceServices.postStudentPresence(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}