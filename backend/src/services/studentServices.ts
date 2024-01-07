import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

const studentRepository = AppDataSource.getRepository(Student);

export class StudentServices {
    getAllStudents() { return studentRepository.find(); }

    newStudent(newStudent) {
        studentRepository.save(newStudent)
    }

    getStudent(id) {        
        return studentRepository.findOne({
            where: { id : id }
        })
    }
    
    getSameClassStudents(classId){      
        console.log(classId);
          
        return studentRepository.findAndCount({
            where:{
                classe :classId
            }
        })
    }
}

// export default studentRepository
