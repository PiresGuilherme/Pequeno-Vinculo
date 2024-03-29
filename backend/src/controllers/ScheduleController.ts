import { Request, Response } from "express";
import { ScheduleServices } from "../services/scheduleServices";
import { Schedule } from "../entity/Schedule";
import { ClassServices } from "../services/classServices";
import { StudentServices } from "../services/studentServices";
import { NotificationController } from "./NotificationController";

const scheduleServices = new ScheduleServices;
const classServices = new ClassServices;


export class ScheduleController {
    async getClassSchedules(req: Request, res: Response) {
        try {
            var schedules = await scheduleServices.getClassSchedules(req.params.id);
            if (schedules.length == 0) {
                return res.status(404).json({message: 'Nenhum bilhete encontrado!'});
            }
            return res.status(200).json(schedules);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async postNewSchedule(req: Request, res: Response) {
        try {
            let newSchedule: Schedule = req.body;
            const classeId = req.body.class;
            const classInstance = await classServices.findOneClass(classeId);

            if (!classInstance) {
                throw new Error;
            }
            const studentServices = new StudentServices();
            const students = await studentServices.getSameClassStudents(classInstance.id)
            
            students[0].forEach(async(student)=>{
                const notificationController = new NotificationController();
                await notificationController.postNotification(student, `Há um novo bilhete para o estudante: ${student.name}`)
            })
            newSchedule.classe = classInstance;
            newSchedule.schedule_date = new Date()
            await scheduleServices.newSchedule(newSchedule)            
            return res.status(200).json(newSchedule);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}