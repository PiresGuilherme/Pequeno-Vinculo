import { User } from "../entity/User";
import { AppDataSource } from "../data-source"
const userRepository = AppDataSource.getRepository(User);

export class UserServices {
    getAllUsers() { return userRepository.find(); }

    newUser(newUser){
        userRepository.save(newUser)
    }
}