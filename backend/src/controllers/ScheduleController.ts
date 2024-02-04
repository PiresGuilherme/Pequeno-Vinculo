import { Request, Response } from "express";
import { ScheduleServices } from "../services/scheduleServices";
import { Schedule } from "../entity/Schedule";
import { ClassServices } from "../services/classServices";

const scheduleServices = new ScheduleServices;
const classServices = new ClassServices;


export class ScheduleController {
    async getClassSchedules(req: Request, res: Response) {
        try {
            var schedules = await scheduleServices.getClassSchedules(req.params.id);
            console.log(schedules);
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
            console.log(newSchedule);
            const classeId = req.body.class;
            const classInstance = await classServices.findOneClass(classeId.id);
            console.log(classInstance);

            if (!classInstance) {
                throw new Error;
            }
            newSchedule.classe = classInstance;
            await scheduleServices.newSchedule(newSchedule)
            return res.status(200).json(newSchedule);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json()
        }
    }
}