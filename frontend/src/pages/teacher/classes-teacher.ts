//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const backend = "http://localhost:3000/api"


const classesSchedule = document.querySelector('.classes-performances') as HTMLElement;
console.log(classesSchedule);
const colorPalette = ['#FEC868', '#FF708D', '#DCC1FC', '#A3E487'];
let colorIndex = 0;

const userJson = localStorage.getItem('login');

if (userJson) {
    const user = JSON.parse(userJson);
    console.log(user.user.id);

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
            var btnSubmit = document.createElement('a');
            btnSubmit.type = 'button';
            btnSubmit.id = 'btnSubmit';
            btnSubmit.innerHTML = `<button>Enviar</button>`;
            var btnExpand = document.createElement('div');
            btnExpand.innerHTML = `
                <span class="material-symbols-outlined expand-button" id="expand${i + 1}" data-id=${i + 1}>
                    expand_more
                </span>`;

            accordionDiv.style.backgroundColor = colorPalette[colorIndex];
            colorIndex = (colorIndex + 1) % colorPalette.length;

            classDiv.appendChild(className);
            classDiv.appendChild(btnSubmit);
            classDiv.appendChild(btnExpand);
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
                    await teachersStudentsAttendance(response.data[i].id, studentsContainer);
                }
            });

        }
    } catch (error: any) {
        console.log(error.message);
    }
}

async function teachersStudentsAttendance(classId: number, container: HTMLElement) {
    try {
        const response = await axios.post('http://localhost:3000/api/student/class', {
            classId: classId
        });
        const students = response.data[0];
        console.log(students);

        container.innerHTML = '';
        if (students == 0) {
            // console.log('ss');
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
            console.log(student);
            var studentDiv = document.createElement('div');
            studentDiv.classList.add('class-performance')
            var studentName = document.createElement('h5');
            studentName.textContent += (`${student.name} ${student.last_name}`);
            const attendance = document.createElement('div');
            attendance.className = 'form-check form-switch'
            attendance.innerHTML = `
            <input class="form-check-input" type="checkbox" role="switch" id="switch-${student.id}">
            <label class="form-check-label" for="switch-${student.id}"></label>
            `
            studentDiv.appendChild(studentName);
            studentDiv.appendChild(attendance);
            container?.appendChild(studentDiv);
        });

        document.getElementById('btnSubmit')?.addEventListener('click', async function () {
            const evaluations = students.map(async (student: any) => {

                const checkboxAttendance = document.getElementById(`switch-${student.id}`) as HTMLInputElement;
                var presence = checkboxAttendance.checked
                var nowDate = new Date();
                await studentAttendance(student.id, presence, nowDate)
            })
            await Promise.all(evaluations);
            alert("Avaliações criadas com sucesso!");
        });
    } catch (error: any) {
        alert(error.message)
    }
}

async function studentAttendance(studentId: number, attendance: boolean, nowDate: Date) {
    try {
        const response = await axios.post(`${backend}/attendance`, {
            student: studentId,
            presence: attendance,
            date_attendance: nowDate
        })
        console.log(response);
        
    } catch (error) {   
        console.log(error);
        
    }
}