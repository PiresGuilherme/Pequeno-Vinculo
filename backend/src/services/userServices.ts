import { User } from "../entity/User";
import { AppDataSource } from "../data-source"
import bcrypt from "bcrypt"
import { log } from "console";


export class UserServices {
    async getAllUsers() { 
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.find(); }

    async newUser(newUser: User){
        const userRepository = AppDataSource.getRepository(User);
      //  newUser.password = await bcrypt.hash(newUser.password, 10) Comentado por enquanto até solucionarmos a validação do front
        const savedUser = userRepository.save(newUser)
        ;(await savedUser).password = undefined
        return savedUser
    }

    //select de filhos funcionando porém aparentemente não está sendo registrado na tabela de relação quando é criado um filho;
    async findChildren(userId: Number){
        const userRepository = AppDataSource.getRepository(User);
        const children = await userRepository
                            .createQueryBuilder("user")
                            .innerJoinAndSelect("user.student","student")
                            .where("user.id = :userId ", { userId })
                            .getMany()
        return children;
    }

    async login(email: string, password: string){
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where:{email: email, password:password}
        })
        
        return user;
        // console.log(user);
        // return user;
        // if (user) {
        //     if (user.password === password) {
        //         // Senha está correta, retorne o usuário autenticado
        //         return user;
        // }
    }
}