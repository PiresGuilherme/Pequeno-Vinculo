import { Schedule } from "../entity/Schedule";
import { AppDataSource } from "../data-source";

const scheduleRepository = AppDataSource.getRepository(Schedule);

export class ScheduleServices {
    newSchedule(newSchedule){
        return scheduleRepository.save(newSchedule);
    }

    getClassSchedules(classId) {
        return scheduleRepository.find({
            where: {
                classe : {id: classId}
            }
        })
    }
}