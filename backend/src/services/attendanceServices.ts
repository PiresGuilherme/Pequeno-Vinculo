import { AppDataSource } from "../data-source";
import { Attendance } from "../entity/Attendance";

export class AttendanceServices {
    async getStudentPresences(studentId){
        console.log(studentId);
        
        const attendanceRepository = await AppDataSource.getRepository(Attendance);
        return attendanceRepository.findAndCount({
            where:{
                student:{id:studentId}
            }
        })
    }

    async postStudentPresence(attendance){
        const attendanceRepository = await AppDataSource.getRepository(Attendance);
        return attendanceRepository.save(attendance)
    }
}