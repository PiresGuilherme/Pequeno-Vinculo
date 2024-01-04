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
            const newUser :User = req.body;
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

    async login(req:Request, res:Response){
        try{
            let login = await userServices.login(req.body.email,req.body.password);
            return res.status(200).json(login);
        }catch(error){
            return res.status(404).json({ error: "Not Found", details: error.message });
        }
    }
}
