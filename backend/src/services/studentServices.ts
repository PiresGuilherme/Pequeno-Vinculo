import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

const studentRepository = AppDataSource.getRepository(Student);

export class StudentServices {
    getAllStudents() { return studentRepository.find(); }

    newStudent(newStudent) {
        studentRepository.save(newStudent)
    }

    getStudent(id) {
        console.log(2);
        
        return studentRepository.findOne({
            where: { id : id }
        })
    }
}

// export default studentRepository
