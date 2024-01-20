import { Request, Response, Router } from "express";
import { AttendanceController } from "../controllers/AttendanceController";

const router = Router();

router.get("/attendance/:id(\\d+)", (req:Request,res:Response)=> {
    const attendanceController = new AttendanceController();
    attendanceController.getStudentPresences(req,res);
})

router.post("/attendance",(req:Request,res:Response)=> {
    const attendanceController = new AttendanceController();
    attendanceController.postStudentPresence(req,res);
})

export {router}