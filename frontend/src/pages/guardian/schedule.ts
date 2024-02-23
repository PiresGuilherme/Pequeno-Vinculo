//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const token = JSON.parse(localStorage.getItem('login')!);
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}

const user = token.user

const childrens = await axios.get(`http://localhost:3000/api/user/children/${user.id}`)
console.log(childrens);


const divChildreSchedule = document.querySelector('.classes-schedule') as HTMLDivElement;
const colorPalette = ['#FEC868', '#FF708D', '#DCC1FC', '#A3E487'];
let colorIndex = 0;


if (childrens) {
    for (let i = 0; i < childrens.data.length; i++) {
        let accordionDiv = document.createElement('div');
        accordionDiv.classList.add('accordion');
        accordionDiv.id = `class-${i}`;
        let oneClass = document.createElement('div');
        let buttons = document.createElement('div');
        let showMoreButton = document.createElement('span');
        let className = document.createElement('h5')
        oneClass.classList.add('class-schedule');
        className.innerHTML = `Agenda ${childrens.data[i].name} ${childrens.data[i].last_name}`
        
        accordionDiv.style.backgroundColor = colorPalette[colorIndex];
        colorIndex = (colorIndex + 1) % colorPalette.length;

        showMoreButton.id = `expand/${i + 1}`
        showMoreButton.classList.add('material-symbols-outlined', 'notMarked', 'expand-button');
        showMoreButton.innerHTML = 'expand_more'

        buttons.appendChild(showMoreButton);
        oneClass.appendChild(className);
        oneClass.appendChild(buttons);
        accordionDiv.appendChild(oneClass);

        const scheduleContainer = document.createElement('div');
        scheduleContainer.id = `scheduleContainer/${i.toString()}`
        scheduleContainer.classList.add('schedule-container');
        accordionDiv.appendChild(scheduleContainer);
        divChildreSchedule.appendChild(accordionDiv);
        accordionDiv.classList.add('mt-2')
        const expandButton = document.getElementById(`expand/${i + 1}`)!;
        expandButton.addEventListener('click', () => {
            
        if(expandButton.classList.contains('notMarked')){                    
            getClassSchedules(childrens.data[i].classe.id, scheduleContainer);
            expandButton.classList.remove('notMarked')
            expandButton.classList.add('Marked')
            return;
        }
        if(expandButton.classList.contains('Marked')){
            document.getElementById(`scheduleContainer/${i}`)!.innerHTML = ''
            expandButton.classList.remove('Marked');
            expandButton.classList.add('notMarked');
            return
        }
        });     
    }
} else {
    let oneClass = document.createElement('div');
    oneClass.classList.add('d-flex', 'justify-content-center',);
    oneClass.innerHTML = 'NÃO HÁ NENHUMA TURMA CADASTRADA';
    divChildreSchedule.appendChild(oneClass)
}

async function getClassSchedules(classId: number, oneClass: HTMLDivElement) {
    try {        
        const schedules = await axios.get(`http://localhost:3000/api/schedule/${classId}`)
        if (schedules == null) {
            console.log('l');

            return;
        }
        let data = schedules.data;      

        for (let index = 0; index < data.length; index++) {
            const schedule = data[index];
            
            let scheduleContainerId = (oneClass.id).split('/', 2)[1]

            const newSchedule = document.createElement('div');
            newSchedule.classList.add('p-1', 'schedule-item');
            newSchedule.id = `accordion${index+1}`
            newSchedule.innerHTML = `
                <div>
                    <h5>${schedule.schedule_date}</h5>
                    <p>${schedule.title}</p>
                </div>
                <span class="material-symbols-outlined" id="viewSchedule-${schedule.id}/${scheduleContainerId}">
                visibility
                </span>
            `;

            oneClass.appendChild(newSchedule);

            let viewSchedule = document.getElementById(`viewSchedule-${schedule.id}/${scheduleContainerId}`)!

            viewSchedule.addEventListener('click', () => {

                var modal = document.getElementById("viewModal") as HTMLElement;
                var classShedule = document.getElementById("input-vw-class") as HTMLInputElement;
                var titleSchedule = document.getElementById("input-vw-title") as HTMLInputElement;
                var messageSchedule = document.getElementById("input-vw-message") as HTMLInputElement;
                var position = (oneClass.parentElement?.id!).split('-', 2)[1]

                if (!modal) {
                    console.error("Elemento modal não encontrado");
                    return;
                }
            
                let closeButton = document.getElementsByClassName("close-vw")[0] as HTMLElement;

                modal.style.display = "block";
                classShedule.value = `${childrens.data[position].id} - ${childrens.data[position].name} ${childrens.data[position].last_name}`
                titleSchedule.value = schedule.title
                messageSchedule.value = schedule.message

                closeButton.onclick = function () {
                    modal.style.display = "none";
                };
            
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };
                
            })
        }
    } catch (error: any) {
        if (error.response.status = 404) {
            const newSchedule = document.createElement('div');
            newSchedule.classList.add('class-one-schedule', 'gray-background', 'p-1'); // 
            newSchedule.innerHTML = `
            <h5>Não há nenhum bilhete aqui</h5>
        `;
            oneClass.appendChild(newSchedule);
        }
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

document.addEventListener("DOMContentLoaded", () => {
   
    const logoutLink = document.querySelector(".sub-menu-link") as HTMLAnchorElement;
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.clear();
      window.location.href = "/frontend/src/pages/initial-login.html";
    });
  });
  