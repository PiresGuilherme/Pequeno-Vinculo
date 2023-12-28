import { User } from "../entity/User";
import { AppDataSource } from "../data-source"
import { Student } from "../entity/Student";

const userRepository = AppDataSource.getRepository(User);

export class UserServices {
    getAllUsers() { return userRepository.find(); }

    newUser(newUser){
        userRepository.save(newUser)
    }

    //select de filhos funcionando porém aparentemente não está sendo registrado na tabela de relação quando é criado um filho;
    findChildren(userId){
        return userRepository
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.student","student")
        .where("user.id = :userId ", { userId })
        .getMany();
    }
}