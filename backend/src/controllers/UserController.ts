import { Request, Response } from "express";
import userRepository from "../services/userServices";
import { User } from "../entity/User";

export class UserController {
    async getAllUsers(req:Request,res:Response){
        try {
            const users = await userRepository.find();
            return res.status(200).json(users)
        } catch (error) {
            return res.status(404).json(error)
        }
    }

    async postNewUser(req:Request,res:Response) {
        try {
            const newUser = new User;
            newUser.name = req.body.name;
            newUser.last_name = req.body.last_name;
            newUser.address_city = req.body.address_city;
            newUser.address_complement = req.body.address_complement;
            newUser.address_coutry = req.body.address_coutry;
            newUser.address_neighborhood = req.body.address_neighborhood;
            newUser.address_street = req.body.address_street;
            newUser.area_code = req.body.area_code;
            newUser.birth_date = req.body.birth_date;
            newUser.document = req.body.document;
            newUser.country_code = req.body.country_code;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.phone_number = req.body.phone_number;
            newUser.postal_code = req.body.postal_code;
            newUser.type_user = req.body.type_user;
            userRepository.save(newUser);
            return res.status(200).json(newUser)
        } catch (error){
            return error
        }
    }
}
