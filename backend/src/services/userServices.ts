import { User } from "../entity/User";
import { AppDataSource } from "../data-source"
import bcrypt from "bcrypt"


export class UserServices {
    async getAllUsers() {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.find();
    }

    async newUser(newUser: User) {
        const userRepository = AppDataSource.getRepository(User);
        // console.log(newUser);

        newUser.password = await bcrypt.hash(newUser.password, 10)
        console.log(newUser);

        const savedUser = await userRepository.save(newUser);
        console.log(savedUser);

        if (savedUser) {
            savedUser.password = undefined;
            console.log(savedUser);
        }
        return savedUser
    }

    async getUserById(userId) {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.findOneBy({ id: userId })
    }

    //select de filhos funcionando porém aparentemente não está sendo registrado na tabela de relação quando é criado um filho;
    async findChildren(userId: Number) {
        const userRepository = AppDataSource.getRepository(User);
        const children = await userRepository
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.student", "student")
            .where("user.id = :userId ", { userId })
            .getMany()
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
        console.log(1);
        
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