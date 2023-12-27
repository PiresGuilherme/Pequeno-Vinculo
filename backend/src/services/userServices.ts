import { User } from "../entity/User";
import { AppDataSource } from "../data-source"
import { Student } from "../entity/Student";

const userRepository = AppDataSource.getRepository(User);

export class UserServices {
    getAllUsers() { return userRepository.find(); }

    newUser(newUser){
        userRepository.save(newUser)
    }

    findChildren(userId){
        console.log(userRepository
            .createQueryBuilder("user")
            .innerJoin("user.student","student")
            .where("user.id = :userId ", { userId })
            .getMany());
        
        return userRepository
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.student","student")
        .where("user.id = :userId ", { userId })
        .getMany();
    }
}