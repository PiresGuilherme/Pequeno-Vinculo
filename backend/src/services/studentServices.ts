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
            relations:{
                classe:true
            },
            where: { id : id }
        })
    }
    
    getSameClassStudents(classId){      
        return studentRepository.findAndCount({
            where:{
                classe : {id: classId}
            }
        })
    }
}

// export default studentRepository
