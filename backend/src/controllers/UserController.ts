import { Request, Response } from "express";
import userRepository from "../services/userServices";

export class UserController {
    async getAllUsers(req:Request,res:Response){
        try {
            const users = await userRepository.find();
            return res.status(200).json(users)
        } catch (error) {
            return res.status(404).json()
        }
    }
}
