import { Request, Response, Router } from "express";
import { ClassController } from "../controllers/ClassController";

const router = Router()
let classController = new ClassController()

router.get('/class', (req: Request, res: Response) => {
    classController.getAllClasses(req, res)
});

router.post('/class', (req: Request, res: Response) => {
    classController.postNewClass(req, res);
});

router.post('/class/teacher', (req: Request, res: Response) => {
    classController.findClassroomTeacher(req, res)
});

router.get('/class/id', (req: Request, res: Response) => {
    classController.findOneClass(req, res)
})
export { router };