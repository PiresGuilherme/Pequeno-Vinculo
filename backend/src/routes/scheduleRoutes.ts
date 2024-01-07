import { Request, Response, Router } from "express";
import { ScheduleController } from "../controllers/ScheduleController";

const router = Router();
const scheduleController = new ScheduleController;

router.post('/schedule', (req:Request,res:Response) => {
    scheduleController.postNewSchedule(req,res);
})

router.get('/schedule/:id(\\d+)', (req: Request, res: Response) => {
    scheduleController.getClassSchedules(req, res);
})

export { router };