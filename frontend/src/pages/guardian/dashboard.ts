//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const backend = "http://localhost:3000/api"

const userJson = localStorage.getItem('login');
const children = document.getElementById('children') as HTMLDivElement;
const bestChildrens = document.getElementById('bests') as HTMLDivElement;
const colorPalette = ['#FEC868', '#FF708D', '#DCC1FC', '#A3E487'];
let colorIndex = 0;
if (userJson) {
    const user = JSON.parse(userJson);
    findChildren(user.user.id);
    childrensPerformance(user.user.id);
    notifications(user.user.id);
}

async function findChildren(userId: number) {
    try {
        const response = await axios.get(`${backend}/user/children/${userId}`);
        console.log(response.data);


        if (response.data) {
            response.data.forEach(async (student: any, index: number) => {

                let divChildren = document.createElement('div');
                divChildren.classList.add('best-children-one');
                let link = document.createElement('a');
                let studentInfo = document.createElement('p');

                link.href = `http://127.0.0.1:5500/frontend/src/pages/student/dashboard-student.html?id=${student.id}`

                link.textContent = `Filho ${index + 1}`;
                var turma = await axios.get(`${backend}/class/${student.classe.id}`);
                turma = turma.data;
                studentInfo.innerHTML = `<strong>Nome:</strong>
                <p> ${student.name}</p> <strong>Turma:</strong> <p>${turma.name}</p>`;

                divChildren.appendChild(link);
                divChildren.appendChild(studentInfo);
                divChildren.style.backgroundColor = colorPalette[colorIndex];
                colorIndex = (colorIndex + 1) % colorPalette.length;
                children.appendChild(divChildren);

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
                let link = document.createElement('a');
                link.href = `http://127.0.0.1:5500/frontend/src/pages/student/dashboard-student.html?id=${student.id}`
                link.innerHTML = `<button class="btnLink">Ver desempenho</button>`

                let divBests = document.createElement('div');
                divBests.classList.add('best-children');

                let studentInfo = document.createElement('p');
                var average = await axios.get(`${backend}/evaluate/average/${student.id}`);
                average = average.data;

                var media = ``;
                if (average == null || average == 0) {
                    media = `Nenhuma nota cadastrada!`
                } else {
                    media = `${average.toFixed(2)} / 5`
                }
                studentInfo.innerHTML = `<strong>Nome:</strong>
                <p> ${student.name}</p> <strong>Média:</strong> <p>${media}</p>`;

                divBests.appendChild(studentInfo);
                divBests.appendChild(link);
                divBests.style.backgroundColor = colorPalette[colorIndex];
                colorIndex = (colorIndex + 1) % colorPalette.length;
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
        const notificacoes = notifications.map((notification: any) => {
            const data = new Date(notification.notification_date);
            notification.notification_date = data;
            return notification;
        });
        notificacoes.sort((a: any, b: any) => b.notification_date - a.notification_date);
        const divNotification = document.querySelector('.notification');
        notificacoes.forEach((notification: any) => {
            if (!notification.verified) {
                let divBests = document.createElement('div');
                divBests.classList.add('notifications');

                let message = document.createElement('p');
                message.innerHTML = `${notification.message} `

                const data = new Date(notification.notification_date)
                var date = document.createElement('p');
                date.innerHTML = ` ${data.toLocaleDateString('pt-BR')}`

                const check = document.createElement('a');
                check.id = "btnCheck";
                check.innerHTML = `<span class="material-symbols-outlined">
                check_box
                </span>`

                check.addEventListener('click', async (event: MouseEvent) => {
                    axios.post(`${backend}/notification/user/verified`, {
                        id: notification.id
                    })
                    divBests.remove();
                })
                divBests.appendChild(message);
                divBests.appendChild(date);
                divBests.appendChild(check);
                divBests.style.backgroundColor = colorPalette[colorIndex];
                colorIndex = (colorIndex + 1) % colorPalette.length;
                divNotification?.appendChild(divBests)
                return notification
            }
        })

    } catch (error) {
        console.log(error);
    }
}