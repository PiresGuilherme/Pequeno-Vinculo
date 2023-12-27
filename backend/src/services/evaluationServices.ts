import { AppDataSource } from "../data-source";
import { Evaluation } from "../entity/Evaluation";

const evaluationRepository = AppDataSource.getRepository(Evaluation);

export default evaluationRepository;