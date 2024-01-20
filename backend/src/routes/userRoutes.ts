import { Router , Request, Response } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router()
let userControler = new UserController() //colocar dentro das rotas

router.get("/user", (req: Request, res: Response) => {
    userControler.getAllUsers(req, res);
});

router.post("/user", (req: Request, res: Response) => {
    userControler.postNewUser(req, res);
});

router.get('/user/children/:id(\\d+)', (req:Request,res:Response) => {
    userControler.findChildren(req,res);
})

router.post("/user/login",(req:Request,res:Response) => {
    userControler.login(req, res);
})

export {router};