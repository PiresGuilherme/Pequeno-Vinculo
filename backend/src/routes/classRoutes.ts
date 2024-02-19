import { Request, Response, Router } from "express";
import { ClassController } from "../controllers/ClassController";
import { FileController, reqFile } from "../controllers/FileController";

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'AKIATCKAR55ZBOCTGA7A',
  secretAccessKey: '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',
  region: 'sa-east-1',
});

// const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
const multer = require('multer')
const s3 = new AWS.S3();

const storage = multer.diskStorage({
    storage: multerS3({
        s3: s3,
        bucket: 'pequenovinculo',
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body));
          },

        key: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + "-" + file.originalname)
        }
    })
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads')
    // },
    // filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix +"-" + file.originalname);
    // }
})
const upload = multer({ storage })
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

router.get('/class/:id', (req: Request, res: Response) => {
    let classController = new ClassController()
    classController.findOneClass(req, res)
})

router.get("/class/:id(\\d+)/picture", (req:Request,res:Response)=>{
    const fileController = new FileController();
    return fileController.getClassFiles(req,res);
})
router.post("/class/:id(\\d+)/picture", upload.single('picture'), async (req: reqFile, res: Response) => {
    console.log(req.file);
    
    const fileController = new FileController();
    console.log("1");
    fileController.newPicture(req, res);
})

export { router };