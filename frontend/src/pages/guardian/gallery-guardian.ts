const token = localStorage.getItem('login');
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}

//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
const backend = "http://localhost:3000/api"
const frontend = "http://127.0.0.1:5500/frontend/src/pages"

const userJson = localStorage.getItem('login');
const children = document.getElementById('children') as HTMLDivElement;

if (userJson) {
    const user = JSON.parse(userJson);
    findChildren(user.user.id)
}

async function findChildren(userId: number) {
    try {
        const response = await axios.get(`${backend}/user/children/${userId}`);

        response.data.forEach((student: any) => {
            getStudentClass(student.id)
        })

    } catch (error: any) {
        console.error('sa:', error.message);
    }
}



const classesSchedule = document.querySelector('.classes-gallery') as HTMLElement;
const colorPalette = ['#FEC868', '#FF708D', '#DCC1FC', '#A3E487'];
let colorIndex = 0;

async function getStudentClass(studentId: number) {
    try {
        const response = await axios.get(`${backend}/student/${studentId}`);

        const student = response.data;
        const classe = response.data.classe.id;
        const turma = document.querySelector(`#class${classe}`)
        if (turma) {

            let className = document.querySelector(`#className${classe}`)!;

            className.textContent += ` e ${student.name}`
            return
        } else {
            var classDiv = document.createElement('div');
            classDiv.classList.add('class-gallery');
            classDiv.id = 'class' + (classe);
            let className = document.createElement('h5');
            className.setAttribute('id', `className${classe}`)
            className.textContent += `Turma ${response.data.classe.name} de ${student.name}`;
            var btnAcess = document.createElement('a');
            btnAcess.type = 'button';
            btnAcess.innerHTML = `
                    <span class="material-symbols-outlined" id="${classe}" data-id=${classe}>
                        photo_library
                    </span>`;

            classDiv.style.backgroundColor = colorPalette[colorIndex];
            colorIndex = (colorIndex + 1) % colorPalette.length;


            classDiv.appendChild(className);
            classDiv.appendChild(btnAcess);
            classesSchedule?.appendChild(classDiv);

            document.getElementById(`${classe}`)?.addEventListener('click', async function (event: MouseEvent) {
                window.location.href = `${frontend}/guardian/gallery-dashboard-guardian.html?id=${classe}`
            });
        }
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