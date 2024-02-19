import { Request, Response, Router } from "express";
import { StudentController } from "../controllers/StudentController";


const router = Router();
let studentController = new StudentController()

router.get('/student', (req: Request, res: Response) => {
    studentController.getAllStudents(req, res);
});

router.get('/student/:id(\\d+)', (req: Request, res: Response) => {
    studentController.getStudent(req, res);
});

router.post('/student', (req: Request, res: Response) => {
    studentController.postNewStudent(req, res)
});


router.post('/student/class', (req: Request, res: Response) => {
    studentController.getSameClassStudents(req, res);
});



export { router };