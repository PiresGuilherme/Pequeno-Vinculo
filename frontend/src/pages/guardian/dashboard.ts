const token = localStorage.getItem('login');
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}

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
                // console.log(turma.data);
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

                const check = document.createElement('button');
                check.className = 'btn btn-outline-success';
                check.innerHTML = '<i class="bi bi-check"></i>'

                check.addEventListener('click', async (event: MouseEvent) => {
                    axios.post(`${backend}/notification/user/verified`, {
                        id: notification.id
                    })
                    divBests.remove();
                })
                divBests.appendChild(message);
                divBests.appendChild(date);
                divBests.appendChild(check);
                divNotification?.appendChild(divBests)
                return notification
            }
        })

    } catch (error) {
        console.log(error);
    }
}




async function findLastestNotifications(childrenId: number) {
    try {
        const response = await axios.get(`http://localhost:3000/api/schedule/${childrenId}`)
        console.log(response);

        return response.data;
    } catch (error) {

    }
}

document.getElementById("user-pic")?.addEventListener("click", () => {
    const subMenu = document.getElementById("sub-menu");
    if (subMenu?.classList.contains("open-menu")) {
        subMenu?.classList.remove("open-menu")
    } else {
        subMenu?.classList.add("open-menu")
    }
});

function logout(event: Event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/frontend/src/pages/initial-login.html";
  } 
document.addEventListener("DOMContentLoaded", () => {
   
    const logoutLink = document.getElementById('user-pic-text') as HTMLAnchorElement;
    logoutLink.addEventListener("click", logout);

    const logoutButton = document.getElementById('logout-button') as HTMLAnchorElement;
    logoutButton.addEventListener('click', logout)
  });