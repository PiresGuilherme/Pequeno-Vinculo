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
        console.log(userId);
        
        return userRepository
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.student","student")
        .where("user.id = :userId ", { userId })
        .getMany();
    }

    login(email, password){
        return  userRepository.findOne({
            where:{email: email, password:password}
        });
        // console.log(user);
        // return user;
        // if (user) {
        //     if (user.password === password) {
        //         // Senha está correta, retorne o usuário autenticado
        //         return user;
        // }
    }
}