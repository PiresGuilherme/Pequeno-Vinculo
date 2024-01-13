//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';


const classesJson = localStorage.getItem('classes');
const divClassesSchedule = document.querySelector('.classes-schedule') as HTMLDivElement;

if (classesJson) {
    const classes = JSON.parse(classesJson);

    for (let i = 0; i < classes.data.length; i++) {
        let oneClass = document.createElement('div');
        oneClass.classList.add('class-one-schedule');
        oneClass.innerHTML =`
         <h5>Agenda ${classes.data[i].name}</h5>
          <span class="material-symbols-outlined" id="add${i + 1}">
           add
         </span>`
        divClassesSchedule.appendChild(oneClass)
        document.addEventListener('DOMContentLoaded', () => {
            const addButton = document.getElementById(`add${i + 1}`)!;
            addButton.addEventListener('click', () => {
                console.log(classes.data[i].id);
                getClassSchedules(classes.data[i].id, oneClass);
            });
        });
    }
    // getClassSchedules(classes.data.id);
} else {
    let oneClass = document.createElement('div');
    oneClass.classList.add('d-flex', 'justify-content-center', );
    oneClass.innerHTML = 'NÃO HÁ NENHUMA TURMA CADASTRADA';
    divClassesSchedule.appendChild(oneClass)
}
async function getClassSchedules(classId: number, oneClass: HTMLDivElement) {
    try {
        const schedules = await axios.get(`http://localhost:3000/api/schedule/${classId}`)
        if (schedules == null) {
            console.log('l');

            return;
        }
        console.log(schedules.data)
        let data = schedules.data;
        data.forEach((schedule: any) => {
            console.log(schedule);

            const newSchedule = document.createElement('div');
            newSchedule.classList.add('class-one-schedul', 'gray-background'); // 
            newSchedule.innerHTML = `
            <h5>${schedule.schedule_date}</h5>
            <p>${schedule.message}</p>
        `;
            oneClass.appendChild(newSchedule);
        });


    } catch (error:any) {      
        if (error.response.status = 404) {
            const newSchedule = document.createElement('div');
            newSchedule.classList.add('class-one-schedul', 'gray-background'); // 
            newSchedule.innerHTML = `
            <h5>Não há nenhum bilhete aqui</h5>
        `;
            oneClass.appendChild(newSchedule);
        }
    }
}
