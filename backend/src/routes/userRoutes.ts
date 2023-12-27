import { Router , Request, Response } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router()
let userControler = new UserController()

router.get("/user", (req: Request, res: Response) => {
    userControler.getAllUsers(req, res);
});

router.post("/user", (req: Request, res: Response) => {
    userControler.postNewUser(req, res);
});

router.get('/user/children', (req:Request,res:Response)=>{
    userControler.findChildren(req,res);
})

export {router};