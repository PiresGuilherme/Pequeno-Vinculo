import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

let studentRepository = AppDataSource.getRepository(Student);

export default studentRepository
