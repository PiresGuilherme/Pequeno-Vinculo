import { Request, Response } from "express";
import  {UserServices} from "../services/userServices";
import { User } from "../entity/User";

const userServices = new UserServices

export class UserController {
    async getAllUsers(req:Request,res:Response){
        try {
            let allUsers = await userServices.getAllUsers();
            return res.status(200).json(allUsers)
        } catch (error) {
            return res.status(404).json(error)
        }
    }

    async postNewUser(req:Request,res:Response) {
        try {
            // const newUser = new User;
            const newUser :User = req.body;
            // newUser.name = req.body.name;
            // newUser.last_name = req.body.last_name;
            // newUser.address_city = req.body.address_city;
            // newUser.address_complement = req.body.address_complement;
            // newUser.address_coutry = req.body.address_coutry;
            // newUser.address_neighborhood = req.body.address_neighborhood;
            // newUser.address_street = req.body.address_street;
            // newUser.area_code = req.body.area_code;
            // newUser.birth_date = req.body.birth_date;
            // newUser.document = req.body.document;
            // newUser.country_code = req.body.country_code;
            // newUser.email = req.body.email;
            // newUser.password = req.body.password;
            // newUser.phone_number = req.body.phone_number;
            // newUser.postal_code = req.body.postal_code;
            // newUser.type_user = req.body.type_user;
            // await userRepository.save(newUser);
            await userServices.newUser(newUser)
            return res.status(200).json(newUser)
        } catch (error){
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    async findChildren(req:Request, res:Response){
        try {
            let childrens = await userServices.findChildren(req.body.userId)
            console.log(childrens);
            
            return res.status(202).json(childrens);
        } catch (error) {
            return res.status(404).json({ error: "Not Found", details: error.message });
        }
    }
}
