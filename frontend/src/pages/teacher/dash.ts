const token = localStorage.getItem('login');
if (!token) {
    window.location.href = "/frontend/src/pages/initial-login.html";
}

//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
calendar()
const backend = "http://localhost:3000/api"

const countClassesLine = document.getElementById('countClasses') as HTMLParagraphElement;
const countStudentsLine = document.getElementById('countStudents') as HTMLParagraphElement;
const userJson = localStorage.getItem('login');

const colorPalette = ['#DCC1FC', '#FF708D', '#FEC868', '#A3E487'];
let colorIndex = 0;

if (userJson) {
    const user = JSON.parse(userJson);
    teacherClasses(user.user.id)
}
async function teacherClasses(userId: number) {
    try {
        const response = await axios.post('http://localhost:3000/api/class/teacher', {
            userId: userId
        })

        var classesCoin: Array<any> = [];
        var bestsStudents: Array<any> = [];
        await Promise.all(response.data.map(async (classe: any) => {
            birthdayStudents(classe.id);
            const classCoin = await classTotalCoin(classe.id);
            classesCoin.push(classCoin);
            const bestStudent = await bestStudents(classe.id);
            bestsStudents.push(bestStudent);
        }))
        bestsStudents.sort((a: any, b: any) => b.coin - a.coin)
        const divBestStudents = document.querySelector('.bests') as HTMLDivElement;
        bestsStudents.forEach(async (student: any, index: number) => {
            if (student.coin > 0) {
                index++;
                if (index <= 5) {

                    let divBests = document.createElement('div');
                    divBests.classList.add('best-students');

                    let studentInfo = document.createElement('p');
                    studentInfo.innerHTML = `<strong>Nome:</strong>
                    <p> ${student.name}</p> <strong>Total de moedas:</strong> <p>${student.coin}</p>`;

                    divBests.appendChild(studentInfo);
                    divBests.style.backgroundColor = colorPalette[colorIndex];
                    colorIndex = (colorIndex + 1) % colorPalette.length;
                    divBestStudents.appendChild(divBests);
                }
            }
        })
        classesCoin.sort((a: any, b: any) => b[1] - a[1]);
        classesCoin.forEach((classeId: any, index: number) => {
            if (classeId[1] > 0) {
                index++;
                if (index <= 5) {
                    response.data.forEach(async (classe: any) => {
                        if (classe.id == classeId[0]) {
                            const divBestClasses = document.querySelector('.summary-best-classes');
                            let divBestsC = document.createElement('div');
                            divBestsC.classList.add('bestClasses');
                            if (index === 1) {
                                var goldMedal = document.createElement('img');
                                goldMedal.src = '/frontend/assets/medal-gold.svg';
                                goldMedal.classList.add('gold');
                                goldMedal.style.width = '40px';
                                goldMedal.style.height = '40px';
                                divBestsC.appendChild(goldMedal);
                            } else if (index === 2) {
                                var silverMedal = document.createElement('img');
                                silverMedal.src = '/frontend/assets/medal-silver.svg';
                                silverMedal.classList.add('silver');
                                silverMedal.style.width = '40px';
                                silverMedal.style.height = '40px';
                                divBestsC.appendChild(silverMedal);
                            } else if (index === 3) {
                                var bronzeMedal = document.createElement('img');
                                bronzeMedal.src = '/frontend/assets/medal-bronze.svg';
                                bronzeMedal.classList.add('bronze');
                                bronzeMedal.style.width = '40px';
                                bronzeMedal.style.height = '40px';
                                divBestsC.appendChild(bronzeMedal);
                            }
                            let message = document.createElement('p');
                            let media: number = classeId[1];
                            message.innerHTML = `${index}ª turma: ${classe.name} com a média dos alunos: ${media.toFixed(1)}`;
                            divBestsC.style.backgroundColor = colorPalette[colorIndex];
                            colorIndex = (colorIndex + 1) % colorPalette.length;
                            divBestsC.appendChild(message);
                            divBestClasses?.appendChild(divBestsC);
                        }
                    })
                }
            }
        });
        const countClasses = response.data.length
        var countStudents = 0
        for (let i = 0; i < countClasses; i++) {
            let count = await teachersStudents(response.data[i].id);
            countStudents += count.data[1];


        }
        countClassesLine.textContent = countClasses.toString();
        countStudentsLine.textContent = countStudents.toString();
        localStorage.setItem('classes', JSON.stringify(response))
    } catch (error: any) {
        console.log(error.message);
    }
}

async function teachersStudents(classId: number) {
    try {
        const response = await axios.post('http://localhost:3000/api/student/class', {
            classId: classId
        })
        return response;
    } catch (error: any) {
        console.log(error.message);
    }
}

async function birthdayStudents(classId: number) {
    try {
        const response = await axios.get(`${backend}/student/birthday/class/${classId}`);
        const divbirthdays = document.querySelector('.last-info-birthdays');
        response.data.forEach((student: any) => {
            let divBests = document.createElement('div');
            divBests.classList.add('birthdays');
            let message = document.createElement('p');
            message.innerHTML = `Hoje é aniversário do estudante : ${student.name} da turma ${student.classe.name}`;
            divBests.appendChild(message);
            divbirthdays?.appendChild(divBests);
        })
    } catch (error) {
        console.log(error);
    }
}

async function classTotalCoin(classId: number) {
    try {
        const response = await axios.get(`${backend}/class/coins/${classId}`);
        if (response.data == null) {
            response.data = 0;
        };
        return [classId, response.data];
    } catch (error) {
        console.log(error);
    }
}

async function bestStudents(classId: number) {
    try {
        const response = await axios.get(`${backend}/class/${classId}/best/student`);
        // console.log(response);
        return response.data
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
    $("#active-class").removeClass('active');
    $("#active-performance").removeClass("active");
    $("#active-schedule").removeClass("active");
    $("#active-gallery").removeClass("active")
});
