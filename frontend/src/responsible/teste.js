import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm"
// import axios from "axios"

// let email = "Pires2"s


// let userId = 1
// let divChildren = document.getElementById('children')
// findChildren(userId);
// async function findChildren(userId) {
//     try {
//         const response = await axios.post('http://localhost:3000/api/user/children', {
//             userId: userId
//         })

//         divChildren.innerHTML = '';

//         console.log(response.data[0].student)
//         if (response.data[0]) {
//             // Iterando sobre cada objeto dentro do array 'student'
//             response.data[0].student.forEach((studentObject, index) => {
//                 let link = document.createElement('a');
//                 let studentInfo = document.createElement('p');

//                 // Adicionando atributos e conteúdo aos elementos
//                 console.log(studentObject.id);
//                 // link.href = `http://localhost:3000/api/student/${studentObject.id}`;
//                 link.href = `http://127.0.0.1:5500/frontend/src/responsible/studentDash.html/${studentObject.id}`
//                 link.textContent = `Filho ${index + 1}`;
//                 studentInfo.textContent = `Nome: ${studentObject.name}, Idade: ${studentObject.birth_date}`;
//                 // link.addEventListener('click', () => getLinkStudent(studentObject.id));

//                 // Adicionando elementos ao divChildren
//                 divChildren.appendChild(link);
//                 divChildren.appendChild(studentInfo);
//             });
//         } else {
//             console.log('Nenhum estudante encontrado.');
//         }
//     } catch (error) {
//         console.error('sa:', error.message);
//     }
// }

// async function getLinkStudent(id) {
//     try {
//         const studentUrl =  `http://localhost:3000/api/student/${id}`;
//         console.log('a');
//         window.open(studentUrl, '_blank', 'width=600,height=400');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

//inserir avaliação no aluno
// let evaluation_date= new Date();
// let note = 1;
// let studentId= 2;
// avalualuation(studentId,evaluation_date,note)
// async function avalualuation(studentId, evaluation_date, note){
//     try {
//         const response = await axios.post('http://localhost:3000/api/evaluation', {
//             studentId:studentId,
//             evaluation_date:evaluation_date,
//             note:note
//         })
//         console.log(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }



// let userId = 1
// findChildren(userId);
// async function findChildren(userId) {
//     try {
//         const response = await axios.post('http://localhost:3000/api/user/children', {
//             userId: userId
//         })
//         console.log(response.data[0].student)
//         if (response.data[0]) {
//             // Iterando sobre cada objeto dentro do array 'student'
//             response.data[0].student.forEach((studentObject, index) => {
//                 // Acessando as propriedades do objeto 'student'
//                 console.log(`Estudante ${index + 1}:`);
//                 console.log(`Nome: ${studentObject.name}`);
//                 console.log(`Idade: ${studentObject.birth_date}`);
//                 // Adicione outras propriedades conforme necessário
//             });
//         } else {
//             console.log('Nenhum estudante encontrado.');
//         }
//     } catch (error) {
//         console.error('sa:', error.message);
//     }
// }



// let teste = axios.get("http://localhost:3000/api/user").then((response) => {
//     if (response.status === 200) {
//         const data = response.data;
//         console.log(data);
//         return data;
//     }
// }).catch((error) => {
//     console.error("Erro na requisição:", error);
// });
// console.log(teste);


// contagem de alunos e classes do professor
// teacherClasses(userId);
// async function teacherClasses(userId){
//     try {
//        const response = await axios.post('http://localhost:3000/api/class/teacher',{
//         userId:userId
//        }) 
//        const countClasses = response.data.length
//        let countStudents = 0
//        for (let i = 0; i < countClasses; i++) {
//         let count = await teachersStudents(response.data[i].id);
//         countStudents += count.data[1];
//        }
//     } catch (error) {
//         console.log(error.message);   
//     }
// }
// // teachersStudents(1)
// async function teachersStudents(classId){
//     try {
//         console.log(classId);
//         const response = await axios.post('http://localhost:3000/api/student/class',{
//             classId:classId
//         })
//         console.log(response.data[1]);
//         return response;
//     } catch (error) {
//         console.log(error.message);
//     }
// }



///// avaliar alunos
// const studentId = 3;
// let note = 9; 
// let evaluation_date = new Date();

// // evaluationStudent(studentid,note,evaluation_date);

// async function evaluationStudent(studentId, note, evaluation_date){
//     try {
//         const response = await axios.post('http://localhost:3000/api/evaluation', {
//             student: studentId,
//             note: note,
//             evaluation_date: evaluation_date
//         })
//         console.log(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// document.getElementById('submitBtn').addEventListener('click', function () {
//     var selectedRating = document.querySelector('input[name="rating"]:checked');
// console.log(selectedRating);
//     if (selectedRating == null) {
//         // alert('You rated ' + selectedRating.value);
//         // evaluationStudent(studentId, selectedRating.value, evaluation_date)
//         // Aqui você pode enviar o valor da avaliação para o servidor ou realizar outras ações.
//         selectedRating=0;
//         alert('You rated ' + selectedRating);
//         evaluationStudent(studentId, selectedRating, evaluation_date)
//     } else {
//         // alert('Please select a rating.');
//         // selectedRating.value=0;
//         alert('You rated ' + selectedRating.value);
//         evaluationStudent(studentId, selectedRating.value, evaluation_date)
//     }

// });






//criar grafico com as notas do aluno
const studentId = 2;
performanceMeasurement(studentId);
async function performanceMeasurement(studentId) {
    try {
        const response = await axios.get(`http://localhost:3000/api/evaluation/student/${studentId}`)
        var today = new Date();
        console.log(response.data[0]);
        let datas = response.data.filter(data => {
            return data.evaluation_date;
        }).map(data => ({ ...data, evaluation_date: new Date(data.evaluation_date) }));
        datas.sort((a, b) => b.evaluation_date.getTime() - a.evaluation_date.getTime());
        console.log(datas[0].evaluation_date.getMonth());
        var ctx = document.getElementById("grafico-linhas").getContext("2d");;
        var chartGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datas.slice(0, 5).reverse().map(data => {

                    var dado = (`${data.evaluation_date.getDate()} / ${data.evaluation_date.getMonth() + 1}`)
                    return dado
                })
                ,
                datasets: [{
                    label: "Notas por dia",
                    data: datas.map(data => data.note),
                    borderWidth: 6,
                    borderColor: 'rgba(77,166,253,0.8)'
                }]
            }
        })
    } catch (error) {
        console.log(error);
    }
}
// var ctx = document.getElementById("grafico-linhas");

// var chartGraph = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
//         datasets: [{
//             label: "Vendas de 2019",
//             data: [10, 10, 8, 5, 6, 9, 10, 7, 8, 10, 4, 10],
//             borderWidth: 6,
//             borderColor: 'rgba(77,166,253,0.8)'
//         }]

//     }
// })

// var ctx = document.getElementById("grafico-colunas");
// var chartGraph = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
//     datasets: [{
//         label:"Vendas de 2019",
//         data: [10, 15, 8, 5, 6, 9, 10, 7, 8, 11, 4, 5],
//         borderWidth: 6,
//         borderColor: 'rgba(77,166,253,0.8)'
//     }]

//     }
// })

// var ctx = document.getElementById("grafico-pizza");
// var chartColors = {
//     red: 'rgb(255, 99, 132)',
//     orange: 'rgb(255, 159, 64)',
//     yellow: 'rgb(255, 205, 86)',
//     green: 'rgb(75, 192, 192)',
//     blue: 'rgb(54, 162, 235)',
//     purple: 'rgb(153, 102, 255)',
//     grey: 'rgb(201, 203, 207)'
// };

// var chartGraph = new Chart(ctx, {
//     type: 'pie',
//     data: {
//         labels: ["Jan","Fev","Mar","Abr","Mai"],
//     datasets: [{
//         label:"Vendas de 2019",
//         data: [10, 15, 8, 5, 6],
//         borderWidth: 6,
//         borderColor: 'rgba(77,166,253,0.8)',
//         backgroundColor: [
//             chartColors.red,
//             chartColors.orange,
//             chartColors.yellow,
//             chartColors.green,
//             chartColors.blue,
//         ],
//     }]

//     }
// })    
