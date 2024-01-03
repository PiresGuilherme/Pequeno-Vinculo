import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm"
// import {axios} from "axios"

// let email = "Pires2"s



let divChildren = document.getElementById('children')
let userId = 1
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
                link.href = `javascript:void(0);`
                link.textContent = `Filho ${index + 1}`;
                studentInfo.textContent = `Nome: ${studentObject.name}, Idade: ${studentObject.birth_date}`;
                link.addEventListener('click', () => getLinkStudent(studentObject.id));

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

async function getLinkStudent(id) {
    try {
        const studentUrl =  `http://localhost:3000/api/student/${id}`;
        console.log('a');
        window.open(studentUrl, '_blank', 'width=600,height=400');
    } catch (error) {
        console.log(error.message);
    }
}
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