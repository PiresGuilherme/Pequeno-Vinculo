import { Request, Response, Router } from "express";
import { NotificationController } from "../controllers/NotificationController";

const router = Router()

router.get('/notification/user/:id', (req:Request, res:Response) => {
    const notificationController = new NotificationController();
    notificationController.getNotificationUser(req,res)
})

router.post('/notification/user/verified',(req:Request, res:Response)=>{
    const notificationController = new NotificationController();
    notificationController.verify(req,res);
})
export  {router}