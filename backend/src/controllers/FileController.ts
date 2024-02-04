import { Request, Response } from "express";
import { fileServices } from "../services/fileServices";
import { File } from "../entity/File";
import { Class } from "../entity/Class";
import { ClassServices } from "../services/classServices";

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
            console.log(2);

            const fileService = new fileServices;
            const files = fileService.getClassFiles(req.params.classId);
            console.log(3);
            if (!files) {
                return res.status(200).json("Não foi encontrado nenhuma imagem desta turma")
            }
            return res.status(200).json(files);
        } catch (error) {

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
            console.log(req.file);
            
            console.log(req.body);
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