import { AppDataSource } from "../data-source";
import { File } from "../entity/File";

export class fileServices {
    getClassFiles(classId) {
        const fileRepository = AppDataSource.getRepository(File);
        return fileRepository.findAndCountBy({ classe: classId });

    }
}