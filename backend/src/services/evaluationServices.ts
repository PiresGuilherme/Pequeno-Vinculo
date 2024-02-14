import { AppDataSource } from "../data-source";
import { Evaluation } from "../entity/Evaluation";

// const evaluationRepository = AppDataSource.getRepository(Evaluation);
export class EvaluationServices {
    getAllEvaluations() {
        const evaluationRepository = AppDataSource.getRepository(Evaluation);
        return evaluationRepository.find();
    }

    async newEvaluation(newEvaluation) {
        const evaluationRepository = AppDataSource.getRepository(Evaluation);
        // var valid = false
        // const exist = await evaluationRepository.find({
        //     relations: {
        //         student: true
        //     },
        //     where: {
        //         student: { id: newEvaluation.student.id }
        //     }
        // })
        // exist.forEach(evaluate => {
        //     if (evaluate.evaluation_date == newEvaluation.student.id) {
        //         valid = true;
        //     }
        // })
        // if (valid) {
            evaluationRepository.save(newEvaluation)
        // }
        // else{
        //     throw new Error("Avaliação já foi feita na data de hoje.")
        // }
    }

    findStudentEvaluations(studentId) {
        const evaluationRepository = AppDataSource.getRepository(Evaluation);

        return evaluationRepository.find({
            relations: {
                student: true
            },
            where: {
                student: { id: studentId }
            }
        })
    }
    averageEvaluations(evaluation_date) {
        const evaluationRepository = AppDataSource.getRepository(Evaluation);

        let evaluations = evaluationRepository.findAndCount({
            where: {
                evaluation_date: evaluation_date
            }
        })
        // evaluations.then(evaluate => {
        //     // console.log(evaluate);
        // }
        // )
        return evaluations;
    }
}


// export default evaluationRepository;