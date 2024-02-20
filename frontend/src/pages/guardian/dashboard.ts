//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";


const userJson = localStorage.getItem('login');
const children = document.getElementById('children') as HTMLDivElement;
const bestChildrens = document.getElementById('bests') as HTMLDivElement;
        
if (userJson) {
    const user = JSON.parse(userJson);
    findChildren(user.user.id)
    childrensPerformance(user.user.id)
}
 
async function findChildren(userId : number) {
    try {
        const response = await axios.get(`http://localhost:3000/api/user/children/${userId}`);
        console.log(response.data);
        
        
        if (response.data) {
            response.data.forEach(async (student : any, index:number) => {
                
                let divChildren = document.createElement('div');
                divChildren.classList.add('best-children-one');
                let link = document.createElement('a');
                let studentInfo = document.createElement('p');

                link.href = `http://127.0.0.1:5500/frontend/src/pages/student/dashboard-student.html?id=${student.id}`
                
                link.textContent = `Filho ${index + 1}`;
                var turma = await axios.get(`http://localhost:3000/api/class/${student.classe.id}`);
                console.log(turma.data);
                turma = turma.data;
                studentInfo.innerHTML = `<strong>Nome:</strong>
                <p> ${student.name}</p> <strong>Turma:</strong> <p>${turma.name}</p>`;

                divChildren.appendChild(link);
                divChildren.appendChild(studentInfo);

                children.appendChild(divChildren);

                // findLastestNotifications(student.id);
            });
        } else {
            console.log('Nenhum estudante encontrado.');
        }
    } catch (error : any) {
        console.error('sa:', error.message);
    }
}



async function childrensPerformance(userId : number) {
    try {
        const response = await axios.get(`http://localhost:3000/api/user/children/${userId}`);

        // console.log(response);
        if (response.data) {
            response.data.forEach(async (student : any, index:number) => {
                let divBests = document.createElement('div');
                divBests.classList.add('best-children-one');
               
                let studentInfo = document.createElement('p');
                var average = await axios.get(`http://localhost:3000/api/evaluate/average/${student.id}`);
                average = average.data;
                
                var media = ``;
                if (average == null || average == 0) {
                    media = `Nenhuma nota cadastrada!`
                } else {
                    media = `${average.toFixed(2)} / 5`
                }
                console.log(average);
                studentInfo.innerHTML = `<strong>Nome:</strong>
                <p> ${student.name}</p> <strong>Média:</strong> <p>${media}</p>`;

                divBests.appendChild(studentInfo);

                bestChildrens.appendChild(divBests);

            });
        } else {
            console.log('Nenhum estudante encontrado.');
        }
    } catch (error : any) {
        console.error('sa:', error.message);
    }
}









// async function getStudentInfo(userId :number){
//     try{
//         // let urlParams = new URLSearchParams(window.location.search);
//         // let idParam = urlParams.get('id');
//         let student = await axios.post(`http://localhost:3000/api/student/${userId}`)
//         console.log(student.data);
//         let children = document.getElementById('children') as HTMLDivElement;
//         let divChildren1 = document.createElement('div');
//         divChildren1.classList.add('best-children-one');
        
//         // let newth = document.createElement('th');
//         // newth.textContent = `${student.data.id}`
//         let pName = document.createElement('p');
//         pName.textContent = `${student.data.name}`
//         let pLast = document.createElement('p');
//         pLast.textContent = `${student.data.last_name}`
//         let pBDay = document.createElement('p');
//         pBDay.textContent = `${student.data.birth_date}`
//         // let pDocument = document.createElement('p');
//         // pDocument.textContent = `${student.data.document}`

//         // children.appendChild(newth);
//         children.appendChild(divChildren1);
//         divChildren1.appendChild(pName);
//         divChildren1.appendChild(pLast);
//         divChildren1.appendChild(pBDay);
//         divChildren1.appendChild(pLast);

//     }catch(error : any){
//         console.log(error.message);
//     }
// }




// findLastestNotifications(1)
//notifications
async function findLastestNotifications(childrenId: number){
    try {
        const response = await axios.get(`http://localhost:3000/api/schedule/${childrenId}`)
        console.log(response);
        
        return response;
    } catch (error) {
        
    }
}