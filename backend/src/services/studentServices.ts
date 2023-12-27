import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

const studentRepository = AppDataSource.getRepository(Student);

export class StudentServices {
    getAllStudents() { return studentRepository.find(); }

    newStudent(newStudent){
        studentRepository.save(newStudent)
    }
}

// export default studentRepository
