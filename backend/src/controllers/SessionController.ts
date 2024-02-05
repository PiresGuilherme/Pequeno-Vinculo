import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserServices } from "../services/userServices";

const SECRET_KEY = "minha-senha"; // Retirar daqui e armazenar em uma variável de ambiente

export class SessionController {
    async userLogin(req:Request, res: Response){
        const user = new UserServices();

        let findUser = await user.findUserByEmail(req.body.email)
        

        if (!findUser) {
            throw new Error("Usuário ou senha inválidos");
          }
      
        const validPassword = await bcrypt.compare(req.body.password, findUser.password);
      
          if (!validPassword) {
            throw new Error("Usuário ou senha inválidos");
          }
          
          findUser.password = undefined;

          let token = jwt.sign({ userId: findUser.id, }, SECRET_KEY )

          return res.json({
            "token": `Bearer ${token}`,
            "user": findUser
        });
    }

    verifyToken(token?: string) {
        if (!token) {
          throw new Error("Usuário não está autenticado");
        }
    
        try {
          const jwtPayload = jwt.verify(token, SECRET_KEY);
          return jwtPayload
        } catch (error) {
          throw new Error("Token inválido");
        }
    }
}