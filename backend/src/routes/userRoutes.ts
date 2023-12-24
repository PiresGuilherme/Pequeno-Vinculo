import { Router , Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import server from '../server';

const router = Router()
let userControler = new UserController()

router.get("/user", (req: Request, res: Response) => {
    userControler.getAllUsers(req, res);
})

export {router};