import { AppDataSource } from "../data-source";
import { Class } from "../entity/Class";

const classRepository = AppDataSource.getRepository(Class);
export class ClassServices {
    getAllClasses() { return classRepository.find(); }

    newClass(newClass: Class) {
        classRepository.save(newClass)
    }
    
    //encontra uma única classe
    findOneClass(classId) {
        return classRepository.findOne({
            where: {
                id: classId
            }
        });
    }

    //Encontra todas as classes que o professor atua
    findTeacher(userId) {
        return classRepository.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: userId
                }
            }
        })
    }
}

export default classRepository;