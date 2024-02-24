const token = localStorage.getItem('login');
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}

//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const classesSchedule = document.querySelector('.classes-performances') as HTMLElement;
const colorPalette = ['#FEC868', '#FF708D', '#DCC1FC', '#A3E487'];
let colorIndex = 0;

const userJson = localStorage.getItem('login');

if (userJson) {
    const user = JSON.parse(userJson);
    teacherClasses(user.user.id);
}

async function teacherClasses(userId: number) {
    try {
        const response = await axios.post('http://localhost:3000/api/class/teacher', {
            userId: userId
        });
        const classes = response.data.length;
        for (let i = 0; i < classes; i++) {
            var accordionDiv = document.createElement('div');
            accordionDiv.classList.add('accordion');
            accordionDiv.id = 'accordion' + (i + 1);
            var classDiv = document.createElement('div');
            classDiv.classList.add('class-performance');
            var className = document.createElement('h5');
            className.textContent += `Turma ${response.data[i].name}`;
            var buttons = document.createElement('div');
            buttons.classList.add('buttons')
            var btnSubmit = document.createElement('a');
            btnSubmit.type = 'button';
            btnSubmit.id = 'btnSubmit' + (i + 1);
            btnSubmit.innerHTML = `<button>Avaliar</button>`;
            var btnExpand = document.createElement('div');
            btnExpand.innerHTML = `
                <span class="material-symbols-outlined expand-button" id="expand${i + 1}" data-id=${i + 1}>
                    expand_more
                </span>`;

            accordionDiv.style.backgroundColor = colorPalette[colorIndex];
            colorIndex = (colorIndex + 1) % colorPalette.length;

            buttons.appendChild(btnSubmit);
            buttons.appendChild(btnExpand);
            classDiv.appendChild(className);
            classDiv.appendChild(buttons);
            accordionDiv.appendChild(classDiv);

            const studentsContainer = document.createElement('div');
            studentsContainer.classList.add('students-container');
            accordionDiv.appendChild(studentsContainer);
            classesSchedule?.appendChild(accordionDiv);

            document.getElementById(`expand${i + 1}`)?.addEventListener('click', async function (event: MouseEvent) {
                //  
                const id = (event.target as HTMLSpanElement).dataset.id;
                const accordionDiv = document.getElementById('accordion' + id);
                if (accordionDiv?.classList.contains('active')) {
                    accordionDiv.classList.remove('active');

                } else {
                    accordionDiv?.classList.toggle('active');
                    await teachersStudents(response.data[i].id, studentsContainer, 'btnSubmit' + (i + 1));
                }
            });

        }
    } catch (error: any) {
        console.log(error.message);
    }
}

async function teachersStudents(classId: number, container: HTMLElement, submitId: any) {
    try {
        const response = await axios.post('http://localhost:3000/api/student/class', {
            classId: classId
        });
        const students = response.data[0];

        container.innerHTML = '';
        if (students == 0) {
            var studentDiv = document.createElement('div');
            studentDiv.classList.add('class-performance');
            studentDiv.classList.add('d-flex');
            studentDiv.classList.add('justify-content-center');
            var studentName = document.createElement('h5');
            studentName.textContent += (`NENHUM ALUNO CADASTRADO NA TURMA!`);
            studentDiv.appendChild(studentName);
            container?.appendChild(studentDiv);
        }
        students.forEach(async (student: any) => {
            var studentDiv = document.createElement('div');
            studentDiv.classList.add('class-performance')
            var studentName = document.createElement('h5');
            studentName.textContent += (`${student.name} ${student.last_name}`);
            var ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating');

            for (let i = 5; i > 0; i--) {
                const input = `<input type="radio" id="star${i}-${student.id}" name="${student.id}" value="${i}">`;
                const label = `<label for="star${i}-${student.id}"><i class="fas fa-star"></i></label>`;
                ratingDiv.innerHTML += (input + label);
            }

            var average = await axios.get(`http://localhost:3000/api/evaluate/average/${student.id}`);
            average = average.data;

            var media = ``;
            if (average == null || average == 0) {
                media = `Nenhuma nota cadastrada!`
            } else {
                media = `${average.toFixed(2)} / 5`
            }
            var studentAverage = document.createElement('p');
            studentAverage.innerHTML += `<strong>Média do aluno:  ${media}</strong>`;

            studentDiv.appendChild(studentName);
            studentDiv.appendChild(studentAverage)
            studentDiv.appendChild(ratingDiv);
            container?.appendChild(studentDiv);
        });

        document.getElementById(submitId)?.addEventListener('click', async function () {
            const evaluations = students.map(async (student: any) => {

                var selectedRating = document.querySelector(`input[name="${student.id}"]:checked`) as HTMLInputElement;
                var nowDate = new Date();
                if (selectedRating == null) {
                    
                } else {
                    await evaluateClass(student.id, Number(selectedRating.value), nowDate);
                }
            })
            await Promise.all(evaluations);
            alert("Avaliações criadas com sucesso!");
        });
    } catch (error: any) {
        alert(error.message)
    }
}

async function evaluateClass(studentId: number, note: number, evaluation_date: Date) {
    try {
        const response = await axios.post('http://localhost:3000/api/evaluation', {
            student: studentId,
            note: note,
            evaluation_date: evaluation_date
        });
        return;
    } catch (error: any) {
        throw new Error(error.message);
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