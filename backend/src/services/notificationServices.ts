
import { Notification } from "../entity/Notification";
import { AppDataSource } from "../data-source";


export class NotificationServices {
    getNotificationUser(userId) {

    }

    postNotification(notification) {
        const notificationReposity = AppDataSource.getRepository(Notification);
        return notificationReposity.save(notification);
    }
}