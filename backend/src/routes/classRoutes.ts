import { Request, Response, Router } from "express";
import { ClassController } from "../controllers/ClassController";
import { FileController } from "../controllers/FileController";

const multer  = require('multer')
const upload = multer({dest:'/uploads/'})
const router = Router()
// let classController = new ClassController()

router.get('/class', (req: Request, res: Response) => {
    let classController = new ClassController()
    classController.getAllClasses(req, res)
});

router.post('/class', (req: Request, res: Response) => {
    let classController = new ClassController()
    classController.postNewClass(req, res);
});

router.post('/class/teacher', (req: Request, res: Response) => {
    let classController = new ClassController()
    classController.findClassroomTeacher(req, res)
});

router.get('/class/id', (req: Request, res: Response) => {
    let classController = new ClassController()
    classController.findOneClass(req, res)
})

router.get("class/:id(\\d+)/files", upload.single('picture'), (req:Request,res:Response)=>{
    // const fileController = new FileController();
    // console.log("1");
    // fileController.getClassFiles(req,res);
})
router.post("class/:id(\\d+)/files",upload.single('picture'), (req:Request,res:Response)=>{
    const fileController = new FileController();
    console.log("1");
    fileController.getClassFiles(req,res);
})

export { router };