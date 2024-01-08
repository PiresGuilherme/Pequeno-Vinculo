// import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm"
import axios from "axios"

// let email = "Pires2"s


let userId = 1
let divChildren = document.getElementById('children')
findChildren(userId);
async function findChildren(userId) {
    try {
        const response = await axios.post('http://localhost:3000/api/user/children', {
            userId: userId
        })

        divChildren.innerHTML = '';

        console.log(response.data[0].student)
        if (response.data[0]) {
            // Iterando sobre cada objeto dentro do array 'student'
            response.data[0].student.forEach((studentObject, index) => {
                let link = document.createElement('a');
                let studentInfo = document.createElement('p');

                // Adicionando atributos e conteúdo aos elementos
                console.log(studentObject.id);
                // link.href = `http://localhost:3000/api/student/${studentObject.id}`;
                link.href = `http://127.0.0.1:5500/frontend/src/responsible/studentDash.html/${studentObject.id}`
                link.textContent = `Filho ${index + 1}`;
                studentInfo.textContent = `Nome: ${studentObject.name}, Idade: ${studentObject.birth_date}`;
                // link.addEventListener('click', () => getLinkStudent(studentObject.id));

                // Adicionando elementos ao divChildren
                divChildren.appendChild(link);
                divChildren.appendChild(studentInfo);
            });
        } else {
            console.log('Nenhum estudante encontrado.');
        }
    } catch (error) {
        console.error('sa:', error.message);
    }
}

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

teacherClasses(userId);
async function teacherClasses(userId){
    try {
       const response = await axios.post('http://localhost:3000/api/class/teacher',{
        userId:userId
       }) 
       const countClasses = response.data.length
       let countStudents = 0
       for (let i = 0; i < countClasses; i++) {
        let count = await teachersStudents(response.data[i].id);
        countStudents += count.data[1];
       }
    } catch (error) {
        console.log(error.message);
    }
}
// teachersStudents(1)
async function teachersStudents(classId){
    try {
        console.log(classId);
        const response = await axios.post('http://localhost:3000/api/student/class',{
            classId:classId
        })
        console.log(response.data[1]);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}