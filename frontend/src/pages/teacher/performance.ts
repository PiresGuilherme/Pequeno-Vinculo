//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

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
            btnSubmit.innerHTML = `<button>Avaliar</button>`;
            var btnExpand = document.createElement('div');
            btnExpand.innerHTML = `
                <span class="material-symbols-outlined expand-button" id="expand${i + 1}" data-id=${i+1}>
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

                }else {
                  accordionDiv?.classList.toggle('active');
                  await teachersStudents(response.data[i].id, studentsContainer);
                }
            });

        }
    } catch (error: any) {
        console.log(error.message);
    }
}

async function teachersStudents(classId: number, container: HTMLElement) {
    try {
        const response = await axios.post('http://localhost:3000/api/student/class', {
            classId: classId
        });
        const students = response.data[0];
        console.log(students);

        container.innerHTML = ''; 

        students.forEach((student: any) => {
            var studentDiv = document.createElement('div');
            studentDiv.classList.add('class-performance');
            var studentName = document.createElement('h5');
            studentName.textContent += (`${student.name} ${student.last_name}`);
            var ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating');

            for (let i = 5; i > 0; i--) {
                const input = `<input type="radio" id="star${i}-${student.id}" name="${student.id}" value="${i}">`;
                const label = `<label for="star${i}-${student.id}"><i class="fas fa-star"></i></label>`;
                ratingDiv.innerHTML += (input + label);
            }
            studentDiv.appendChild(studentName);
            studentDiv.appendChild(ratingDiv);
            container?.appendChild(studentDiv);
        });

        document.getElementById('btnSubmit')?.addEventListener('click', async function () {
            students.forEach(async (student: any) => {
                var selectedRating = document.querySelector(`input[name="${student.id}"]:checked`) as HTMLInputElement;

                var nowDate = new Date();
                if (selectedRating == null) {
                    await evaluateClass(student.id, 0, nowDate);
                } else {
                    await evaluateClass(student.id, Number(selectedRating.value), nowDate);
                }
            });
            if (!Error) {
                alert("Avaliações criadas com sucesso!");
            }
        });
    } catch (error: any) {
        alert(error.message);
    }
}

async function evaluateClass(studentId: number, note: number, evaluation_date: Date) {
    try {
        const response = await axios.post('http://localhost:3000/api/evaluation', {
            student: studentId,
            note: note,
            evaluation_date: evaluation_date
        });
        console.log(response);
        return;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
