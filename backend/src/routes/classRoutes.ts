import { Request, Response, Router } from "express";
import { ClassController } from "../controllers/ClassController";

const router = Router()
let classController = new ClassController()

router.get('/class', (req: Request, res: Response) => {
    classController.getAllClasses(req, res)
    console.log(2);
});

router.post('/class', (req: Request, res: Response) => {
    classController.postNewClass(req, res);
});
export { router };