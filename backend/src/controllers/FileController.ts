import { Request, Response } from "express";
import { fileServices } from "../services/fileServices";
import { File } from "../entity/File";
import { Class } from "../entity/Class";
import { ClassServices } from "../services/classServices";
import { StudentServices } from "../services/studentServices";
import { NotificationController } from "./NotificationController";

export interface reqFile extends Request {
    file: {
        fieldname: string,
        originalname: string,
        encoding: string,
        mimetype: string,
        destination: string,
        filename: string,
        path: string,
        size: number
    };
}
export class FileController {
    async getClassFiles(req: Request, res: Response) {
        try {
 
            const fileService = new fileServices();
            const files = await fileService.getClassFiles(Number(req.params.id));
            console.log(files);
            if (!files) {
                return res.status(404).json("Não foi encontrado nenhuma imagem desta turma")
            }
            return res.status(200).json(files);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async newPicture(req: reqFile, res: Response) {
        try {
            const fileService = new fileServices()
            const classService = new ClassServices();
            const classe = await  classService.findOneClass(req.params.id);
            if(!classe){
                return Error("Classe não encontrada!")
            }
            // console.log(req.file);
            const studentServices = new StudentServices();
            const students = await studentServices.getSameClassStudents(classe.id)
            console.log(students);
            
            students[0].forEach(async(student)=>{
                const notificationController = new NotificationController();
                await notificationController.postNotification(student, `Postaram uma nova foto na turma do estudante: ${student.name}`)
            })
            // console.log(req.body);
            var newPicture : File = {
                fieldname : req.file.fieldname,
                originalname : req.file.originalname,
                encoding : req.file.encoding,
                mimetype : req.file.mimetype,
                destination : req.file.destination,
                filename : req.file.filename,
                path : req.file.path,
                size : req.file.size,
                id : null,
                description : req.body.description,
                classe : classe}
            await fileService.newPicture(newPicture);
            return res.status(200).json(newPicture);
        } catch (error) {

        }
    }
}