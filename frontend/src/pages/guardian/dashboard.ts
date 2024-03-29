const token = localStorage.getItem('login');
if (!token) {
    window.location.href = "/frontend/src/pages/initial-login.html";
}

//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
calendar();
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


        if (response.data) {
            response.data.forEach(async (student: any, index: number) => {

                let divChildren = document.createElement('div');
                divChildren.classList.add('best-children-one');
                let studentInfo = document.createElement('p');
                var turma = await axios.get(`${backend}/class/${student.classe.id}`);
                turma = turma.data;
                studentInfo.innerHTML = `<strong>Nome:</strong>
                <p> ${student.name}</p> <strong>Turma:</strong> <p>${turma.name}</p>`;

                divChildren.appendChild(studentInfo);
                divChildren.style.backgroundColor = colorPalette[colorIndex];
                colorIndex = (colorIndex + 1) % colorPalette.length;
                children.appendChild(divChildren);
            });
        }
    } catch (error: any) {
        console.error('sa:', error.message);
    }
}



async function childrensPerformance(userId: number) {
    try {
        const response = await axios.get(`${backend}/user/children/${userId}`);

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

async function calendar() {
    type Day = {
        "day": number | string,
        "weekDay": number
    }
    const elementMonth = document.getElementById('month')!;
    const month = new Date().toLocaleString('default', { month: 'long' })
    const daysOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    const weeksOfMonth: Day[] = []

    elementMonth.innerHTML = `${month.toUpperCase()}`
    for (let i = 1; i <= daysOfMonth; i++) {
        let day: Day = {
            "day": new Date(new Date().getFullYear(), new Date().getMonth(), i).getDate(),
            "weekDay": new Date(new Date().getFullYear(), new Date().getMonth(), i).getDay()
        }
        weeksOfMonth.push(day)
    }

    if (weeksOfMonth[0].weekDay != 0) {
        let indexOfDay = weeksOfMonth[0].weekDay

        for (let i = indexOfDay - 1; i >= 0; i--) {
            weeksOfMonth.splice(0, 0, { "day": '', "weekDay": i })
        }
    }

    if (weeksOfMonth[weeksOfMonth.length - 1].weekDay != 6) {
        let indexOfDay = weeksOfMonth[weeksOfMonth.length - 1].weekDay;

        for (let i = indexOfDay + 1; i <= 6; i++) {
            weeksOfMonth.push({ "day": '', "weekDay": i })
        }
    }

    for (let i = 0, count = 0; i <= 5; i++) {
        for (let index = 0; index <= 6 && count <= weeksOfMonth.length - 1; index++, count++) {
            let dayElement = document.getElementById(`day-${i}/${index}`)!
            dayElement.innerHTML = `${weeksOfMonth[count].day}`
            if (weeksOfMonth[count].day === new Date().getDate()) {
                dayElement.classList.add('today')
            }
            if (Number(weeksOfMonth[count].day) < new Date().getDate()) {
                dayElement.classList.add('scnd-font-color')
            }
        }
    }
}

$(document).ready(function () {
    $("#active-home").addClass("active");
    $("#active-schedule").removeClass('active');
    $("#active-gallery").removeClass("active")
});