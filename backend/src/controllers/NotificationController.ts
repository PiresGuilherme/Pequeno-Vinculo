import { Request, Response } from "express";
import { NotificationServices } from "../services/notificationServices";
import { Notification } from "../entity/Notification";
import { StudentServices } from "../services/studentServices";
import { Student } from "../entity/Student";
import { UserServices } from "../services/userServices";

export class NotificationController {

    async getNotificationUser(req:Request,res:Response){

    }

    async postNotification(student: Student, message: string) {
        try {
            const userService = new UserServices();
            // console.log(student.user);

            var user = await userService.getUserById(student.user[0].id);
            console.log(user);
            student.user.forEach(async user => {
                const notificationReposity = new NotificationServices();
                const newNotification: Notification = {
                    id: null,
                    message: message,
                    notification_date: new Date(),
                    verified: false,
                    user: user
                }
                console.log(newNotification);
                await notificationReposity.postNotification(newNotification)
            })

        } catch (error) {
        }

    }
}