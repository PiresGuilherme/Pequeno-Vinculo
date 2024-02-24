import { User } from "../entity/User";
import { AppDataSource } from "../data-source"
import bcrypt from "bcrypt"
import { Student } from "../entity/Student";


export class UserServices {
    async getAllUsers() {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.find();
    }

    async newUser(newUser: User) {
        const userRepository = AppDataSource.getRepository(User);
        newUser.password = await bcrypt.hash(newUser.password, 10)
        const savedUser = await userRepository.save(newUser);

        if (savedUser) {
            savedUser.password = undefined;
        }
        return savedUser
    }

    async getUserById(userId) {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.findOneBy({ id: userId })
    }

    async findChildren(userId: number) {
        const studentRepository = AppDataSource.getRepository(Student);
        const children = await studentRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                classe: true
            }
        })
        return children;
    }

    async findUserByEmail(email: string) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { email: email }
        })

        return user;
    }

    async findTeachers() {
        const userRepository = AppDataSource.getRepository(User);
        
        const teachers = await userRepository.find({
            where: {
                type_user:'TEACHER'
            }
        })
                //     const teachers = await userRepository.createQueryBuilder("user")
        // .where("user.type_user = :type", { type: "TEACHER" })
        // .andWhere(qb => {
        //     return qb.where("user.name LIKE :searchTerm", { searchTerm: `%${searchTerm}%` })
        //         .orWhere("user.last_name LIKE :searchTerm", { searchTerm: `%${searchTerm}%` });
        // })
        // .getMany();
        return teachers;
    }
}