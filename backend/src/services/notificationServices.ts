
import { Notification } from "../entity/Notification";
import { AppDataSource } from "../data-source";


export class NotificationServices {
    async getNotificationUser(userId) {
        const notificationRepository = AppDataSource.getRepository(Notification);
        return await notificationRepository.find({
            where:{
                user:{
                    id:userId
                }
            }
        })
    }

    postNotification(notification) {
        const notificationRepository = AppDataSource.getRepository(Notification);
        return notificationRepository.save(notification);
    }
}