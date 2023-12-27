import { AppDataSource } from "../data-source";
import { Evaluation } from "../entity/Evaluation";

const evaluationRepository = AppDataSource.getRepository(Evaluation);
export class EvaluationServices {
    getAllEvaluations() { return evaluationRepository.find(); }

    newEvaluation(newEvaluation){
        evaluationRepository.save(newEvaluation)
    }
}

// export default evaluationRepository;