import { Request, Response } from "express";
import { fileServices } from "../services/fileServices";

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
}