import { Request, Response } from "express";
import { UserServices } from "../services/userServices";
import { User } from "../entity/User";

const userServices = new UserServices

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            let allUsers = await userServices.getAllUsers();
            return res.status(200).json(allUsers)
        } catch (error) {
            return res.status(404).json(error)
        }
    }

    async postNewUser(req: Request, res: Response) {
        try {
            const newUser: User = req.body;
            
            await userServices.newUser(newUser);
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    async findChildren(req: Request, res: Response) {
        try {
            let childrens = await userServices.findChildren(Number(req.params.id))

            return res.status(202).json(childrens);
        } catch (error) {
            return res.status(404).json({ error: "Not Found", details: error.message });
        }
    }

    async findUserByEmail(req: Request, res: Response) {
        try {
            let login = await userServices.findUserByEmail(req.body.email);
            if (login == null) {
                return res.status(404).json({ message: "Usuário inexistente." })
            }
            return res.status(200).json(login);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    async findTeachers(req: Request, res: Response) {
        try {
            
            const userService = new UserServices();
            const teachers = await userService.findTeachers(
                );
            res.status(200).json(teachers);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }

    }
}
