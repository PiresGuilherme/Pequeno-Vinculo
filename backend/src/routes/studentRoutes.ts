import { Request, Response, Router } from "express";
import { StudentController } from "../controllers/StudentController";


const router = Router();

router.get('/student', async (req: Request, res: Response) => {
    let studentController = new StudentController()
    await studentController.getAllStudents(req, res);
});

router.get('/student/birthday/class/:id(\\d+)', async (req: Request, res: Response) => {   
    let studentController = new StudentController()
    await studentController.getBirthdayStudent(req, res);
});

router.get('/student/:id(\\d+)', async (req: Request, res: Response) => {
    let studentController = new StudentController()
    await studentController.getStudent(req, res);
});

router.post('/student', async (req: Request, res: Response) => {
    let studentController = new StudentController()
    await studentController.postNewStudent(req, res)
});


router.post('/student/class', async (req: Request, res: Response) => {
    let studentController = new StudentController()
    await studentController.getSameClassStudents(req, res);
});


export { router };