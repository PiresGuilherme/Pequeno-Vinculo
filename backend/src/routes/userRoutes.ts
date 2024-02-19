import { Router , Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { SessionController } from '../controllers/SessionController';

const router = Router()

router.get("/user", async (req: Request, res: Response) => {
    let userControler = new UserController()
    await userControler.getAllUsers(req, res);
});

router.post("/user", async (req: Request, res: Response) => {
    let userControler = new UserController()
    await userControler.postNewUser(req, res);
});

router.get('/user/children/:id(\\d+)', async (req:Request,res:Response) => {
    let userControler = new UserController()
    await userControler.findChildren(req,res);
})

router.post("/user/login", async (req:Request,res:Response) => {
    let sessionController = new SessionController()
    return await sessionController.userLogin(req, res);
})

export {router};