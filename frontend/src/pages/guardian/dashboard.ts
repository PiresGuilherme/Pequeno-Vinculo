//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const backend = "http://localhost:3000/api"

const userJson = localStorage.getItem('login');
const children = document.getElementById('children') as HTMLDivElement;
const bestChildrens = document.getElementById('bests') as HTMLDivElement;

if (userJson) {
    const user = JSON.parse(userJson);
    findChildren(user.user.id);
    childrensPerformance(user.user.id);
    notifications(user.user.id);
}

async function findChildren(userId: number) {
    try {
        const response = await axios.get(`${backend}/user/children/${userId}`);
        // console.log(response.data);


        if (response.data) {
            response.data.forEach(async (student: any, index: number) => {

                let divChildren = document.createElement('div');
                divChildren.classList.add('best-children-one');
                let link = document.createElement('a');
                let studentInfo = document.createElement('p');

                link.href = `http://127.0.0.1:5500/frontend/src/pages/student/dashboard-student.html?id=${student.id}`

                link.textContent = `Filho ${index + 1}`;
                var turma = await axios.get(`${backend}/class/${student.classe.id}`);
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
    } catch (error: any) {
        console.error('sa:', error.message);
    }
}



async function childrensPerformance(userId: number) {
    try {
        const response = await axios.get(`${backend}/user/children/${userId}`);

        // console.log(response);
        if (response.data) {
            response.data.forEach(async (student: any, index: number) => {
                let divBests = document.createElement('div');
                divBests.classList.add('best-children-one');

                let studentInfo = document.createElement('p');
                var average = await axios.get(`${backend}/evaluate/average/${student.id}`);
                average = average.data;

                var media = ``;
                if (average == null || average == 0) {
                    media = `Nenhuma nota cadastrada!`
                } else {
                    media = `${average.toFixed(2)} / 5`
                }
                // console.log(average);
                studentInfo.innerHTML = `<strong>Nome:</strong>
                <p> ${student.name}</p> <strong>Média:</strong> <p>${media}</p>`;

                divBests.appendChild(studentInfo);

                bestChildrens.appendChild(divBests);

            });
        } else {
            // console.log('Nenhum estudante encontrado.');
        }
    } catch (error: any) {
        console.error('sa:', error.message);
    }
}

async function notifications(userId: number) {
    try {
        const response = await axios.get(`${backend}/notification/user/${userId}`)
        const notifications = response.data
        console.log(notifications);
        // notifications.sort(function(a, b) {
        //     // Convert the date strings to Date objects
        //     let dateA =  Date.parse(a.date);
        //     let dateB =  Date.parse(b);

        //     // Subtract the dates to get a value that is either negative, positive, or zero
        //     return  dateB -dateA ;
        //   });
        //   console.log(notifications);
          

        //é necessário organizar o array por datas!!! 

        // const divNotification = document.querySelector('.notification');
        // const notificacoes = notifications.map((notification: any) => {
        //     // let divBests = document.createElement('div');
        //     // divBests.classList.add('notifications');

        //     // let message = document.createElement('p');
        //     // message.innerHTML = `${notification.message} `
        //     const data = new Date(notification.notification_date)

        //     // var date = document.createElement('p');
        //     // date.innerHTML = ` ${data.toLocaleDateString('pt-BR')}`
        //     notification.notification_date = data;
        //     console.log(notification);

        //     // divBests.appendChild(message);
        //     // divBests.appendChild(date);
        //     // divNotification?.appendChild(divBests)
        //     return notification
        // })
        //  notificacoes.sort(function(a:Date, b:Date) {
        //     // Convert the date strings to Date objects
        //     let dateA =  Date.parse(a);
        //     let dateB =  Date.parse(b);

        //     // Subtract the dates to get a value that is either negative, positive, or zero
        //     return dateA - dateB;
        //   });

    } catch (error) {
        console.log(error);
    }
}




async function findLastestNotifications(childrenId: number) {
    try {
        const response = await axios.get(`http://localhost:3000/api/schedule/${childrenId}`)
        console.log(response);

        return response;
    } catch (error) {

    }
}