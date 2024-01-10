import { AppDataSource } from "../data-source";
import { Evaluation } from "../entity/Evaluation";

const evaluationRepository = AppDataSource.getRepository(Evaluation);
export class EvaluationServices {
    getAllEvaluations() { return evaluationRepository.find(); }

    newEvaluation(newEvaluation){
        evaluationRepository.save(newEvaluation)
    }

    findStudentEvaluations(studentId) {
        return evaluationRepository.find({
            relations: {
                student: true
            },
            where: {
                student: {id: studentId}
            }
        })
    }
}

// export default evaluationRepository;