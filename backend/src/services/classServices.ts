import { AppDataSource } from "../data-source";
import { Class } from "../entity/Class";

const classRepository = AppDataSource.getRepository(Class);

export default classRepository;