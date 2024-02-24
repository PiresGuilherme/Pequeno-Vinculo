import { AppDataSource } from "../data-source";
import { File } from "../entity/File";

export class fileServices {
   async getClassFiles(classId:number) {
        const fileRepository = AppDataSource.getRepository(File);        
        const files = await fileRepository.find({
            relations: {classe:true}, 
            where: { classe: {id: classId }}
        });        
        return files;
    }

    newPicture(file) {
        const fileRepository = AppDataSource.getRepository(File);
        fileRepository.save(file);
    }

}