import { Request, Response, Router } from "express";
import { ClassController } from "../controllers/ClassController";
import { FileController, reqFile } from "../controllers/FileController";

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +"-" + file.originalname);
    }
  })
const upload = multer({storage})
const router = Router()

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

router.get('/class/coins/:id(\\d+)', (req:Request,res:Response)=>{
    const classController = new ClassController();
    classController.findBestClasses(req,res);
})

router.get('/class/:id', (req: Request, res: Response) => {
    let classController = new ClassController()
    classController.findOneClass(req, res)
})

router.get('/class/:id(\\d+)/best/student',(req:Request, res:Response)=> {
    const classController = new ClassController();
    classController.findBestStudent(req,res)
})

router.get("/class/:id(\\d+)/picture", (req:Request,res:Response)=>{
    const fileController = new FileController();
    return fileController.getClassFiles(req,res);
})
router.post("/class/:id(\\d+)/picture", upload.single('picture'), async (req: reqFile, res: Response) => {
    
    const fileController = new FileController();
    fileController.newPicture(req, res);
})



export { router };