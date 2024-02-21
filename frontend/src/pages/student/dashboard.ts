//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
const back = "http://localhost:3000/api";

try {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get('id');
    
    let student = await axios.get(`http://localhost:3000/api/student/${idParam}`)
    if (student) {
        student = student.data
        getEvaluations(student.id)
    }
    const studentInfoDiv = document.querySelector('#student-info');
    const studentInfo = document.createElement('div');
    studentInfo.innerHTML = `
        <h2>${student.name} ${student.last_name}</h2>
            <p>Turma : ${student.classe.name}</p>
            <p>Turno : ${student.classe.shift}</p>
            <p>Responsável : ${student.user[0].name} ${student.user[0].last_name}</p>
        `;
        var average = await axios.get(`http://localhost:3000/api/evaluate/average/${student.id}`);
        average = average.data;
        
        var media = ``;
        if (average == null || average == 0) {
            media = `Nenhuma nota cadastrada!`
        } else {
            media = `${average.toFixed(2)} / 5`
        }
        console.log(average);
        studentInfo.innerHTML += `<strong>Média:  ${media}</strong>`;
    studentInfoDiv?.appendChild(studentInfo);
} catch (error) {
    console.log(error);
    alert('Estudante não informado!')
    history.back()
}



async function getEvaluations(studentId: number) {
    try {
        const response = await axios.get(`${back}/evaluation/student/${studentId}`);
        console.log(response.data);
        const evaluations = response.data;
        evaluations.forEach((evaluation: any) => {
            var ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating');
            var dateEvaluation = document.createElement('p');
            for (let i = 5; i > 0; i--) {
                if (i == evaluation.note) {
                    var input = `<input type="radio" id="star${i}-${evaluation.id}" name="${evaluation.id}" value="${i}" checked disabled>`;
                } else {
                    var input = `<input type="radio" id="star${i}-${evaluation.id}" name="${evaluation.id}" value="${i}" disabled>`;
                }
                const label = `<label for="star${i}-${evaluation.id}" disabled><i class="fas fa-star" ></i></label>`;
                ratingDiv.innerHTML += (input + label);
                var date = new Date(evaluation.evaluation_date);
                dateEvaluation.innerHTML = `${date.toLocaleDateString('pt-BR')}`
            }
            const evaluationContainer = document.createElement('div');
            evaluationContainer.className = 'd-flex justify-content-evenly'

            evaluationContainer.appendChild(dateEvaluation);
            evaluationContainer.appendChild(ratingDiv);

            const dashboardDiv = document.querySelector('#dashboard');
            dashboardDiv?.appendChild(evaluationContainer);
        })
    } catch (error) {

    }
}