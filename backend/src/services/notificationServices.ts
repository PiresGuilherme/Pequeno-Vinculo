
import { Notification } from "../entity/Notification";
import { AppDataSource } from "../data-source";


export class NotificationServices {
    getNotificationUser(userId) {
        const notificationReposity = AppDataSource.getRepository(Notification);
        return notificationReposity.find({
            where: {
                user: {
                    id: userId
                }
            }
        })
    }

    postNotification(notification) {
        const notificationReposity = AppDataSource.getRepository(Notification);
        return notificationReposity.save(notification);
    }

    async verified(notificationId){
        const notificationReposity = AppDataSource.getRepository(Notification);
        return await notificationReposity.update({
            id:notificationId
        }, {
            verified:true
        })
    }
}