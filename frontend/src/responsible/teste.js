import axios from "axios"

let email = "Pires2"
let password = "Pires3"

const login = async (email, password) => {
    try {
    const response = await axios.post('http://localhost:3000/api/user/login', {
    email: email,
    password: password,
    });
    console.log(response);
    console.log(email, password);
    // Se a solicitação for bem-sucedida, você pode lidar com a resposta (por exemplo, armazenar o token)
    const token = response.data.token;
    console.log('Token de autenticação:', token);

    } catch (error) {
        console.error('Erro durante o login:', error.message);
    }
}
login(email,password)



// let divChildren = document.getElementById('children')
// let userId = 1
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
//                 link.href = `/user/${studentObject.id}`;
//                 link.textContent = `Filho ${index + 1}`;
//                 studentInfo.textContent = `Nome: ${studentObject.name}, Idade: ${studentObject.birth_date}`;

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
let userId = 1
findChildren(userId);
async function findChildren(userId) {
    try {
        const response = await axios.post('http://localhost:3000/api/user/children', {
            userId: userId
        })
        console.log(response.data[0].student)
        if (response.data[0]) {
            // Iterando sobre cada objeto dentro do array 'student'
            response.data[0].student.forEach((studentObject, index) => {
                // Acessando as propriedades do objeto 'student'
                console.log(`Estudante ${index + 1}:`);
                console.log(`Nome: ${studentObject.name}`);
                console.log(`Idade: ${studentObject.birth_date}`);
                // Adicione outras propriedades conforme necessário
            });
        } else {
            console.log('Nenhum estudante encontrado.');
        }
    } catch (error) {
        console.error('sa:', error.message);
    }
}

let teste = axios.get("http://localhost:3000/api/user").then((response) => {
    if (response.status === 200) {
        const data = response.data;
        console.log(data);
        return data;
    }
}).catch((error) => {
    console.error("Erro na requisição:", error);
});
console.log(teste);