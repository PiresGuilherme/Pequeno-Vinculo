import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

// const studentRepository = AppDataSource.getRepository(Student);

export class StudentServices {
    async getAllStudents() {
        const studentRepository = AppDataSource.getRepository(Student);
        return studentRepository.find();
    }

    async newStudent(newStudent) {
        const studentRepository = AppDataSource.getRepository(Student);

        studentRepository.save(newStudent)
    }

    async getStudent(id) {
        const studentRepository = AppDataSource.getRepository(Student);

        return studentRepository.findOne({
            where: { id: id }
        })
    }

    async getSameClassStudents(classId) {
        const studentRepository = AppDataSource.getRepository(Student);

        return studentRepository.findAndCount({
            where: {
                classe: { id: classId }
            }
        })
    }
    async earnCoin(studentId, value) {
        const studentRepository = AppDataSource.getRepository(Student);
        const student = await studentRepository.findOne({where:{id:studentId}});
        student.coin+= value
    }
}

// export default studentRepository
