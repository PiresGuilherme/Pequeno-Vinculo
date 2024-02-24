//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const token = localStorage.getItem('login');
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}

const buttonAddSchedule = document.querySelector('.add-reminder-button') as HTMLButtonElement;
const classesJson = localStorage.getItem('classes');
const divClassesSchedule = document.querySelector('.classes-schedule') as HTMLDivElement;
const colorPalette = ['#FEC868', '#FF708D', '#DCC1FC', '#A3E487'];
let colorIndex = 0;


if (classesJson) {
    const classes = JSON.parse(classesJson);

    for (let i = 0; i < classes.data.length; i++) {
        let accordionDiv = document.createElement('div');
        accordionDiv.classList.add('accordion');
        accordionDiv.id = `class-${i}`;
        let oneClass = document.createElement('div');
        let buttons = document.createElement('div');
        let showMoreButton = document.createElement('span');
        let addButton = document.createElement('span');
        let className = document.createElement('h5')
        oneClass.classList.add('class-schedule');
        className.innerHTML = `Agenda ${classes.data[i].name}`
        
        accordionDiv.style.backgroundColor = colorPalette[colorIndex];
        colorIndex = (colorIndex + 1) % colorPalette.length;

        showMoreButton.id = `expand/${i + 1}`
        showMoreButton.classList.add('material-symbols-outlined', 'notMarked', 'expand-button');
        addButton.classList.add('material-symbols-outlined');
        addButton.id = `add-button/${i + 1}`
        showMoreButton.innerHTML = 'expand_more'
        addButton.innerHTML = 'add';

        buttons.appendChild(addButton);
        buttons.appendChild(showMoreButton);
        oneClass.appendChild(className);
        oneClass.appendChild(buttons);
        accordionDiv.appendChild(oneClass);

        const scheduleContainer = document.createElement('div');
        scheduleContainer.id = `scheduleContainer/${i.toString()}`
        scheduleContainer.classList.add('schedule-container');
        accordionDiv.appendChild(scheduleContainer);
        divClassesSchedule.appendChild(accordionDiv);
        accordionDiv.classList.add('mt-2')

        document.addEventListener('DOMContentLoaded', () => {
            const expandButton = document.getElementById(`expand/${i + 1}`)!;
            expandButton.addEventListener('click', () => {
                if(expandButton.classList.contains('notMarked')){
                    getClassSchedules(classes.data[i].id, scheduleContainer);
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
        });

        document.addEventListener('DOMContentLoaded', () => {
            var modal = document.getElementById("myModal") as HTMLElement;

            if (!modal) {
                console.error("Elemento modal não encontrado");
                return;
            }

            var closeButton = document.getElementsByClassName("close")[0] as HTMLElement;

            var addButton = document.getElementById(`add-button/${i + 1}`) as HTMLElement;
        
            addButton.onclick = function () {
                let inputClass = document.getElementById("input-class")! as HTMLInputElement
                modal.style.display = "block";
                inputClass.value = `${classes.data[i].id}-${classes.data[i].name}`
            };

            closeButton.onclick = function () {
                modal.style.display = "none";
            };

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        });


    }
} else {
    let oneClass = document.createElement('div');
    oneClass.classList.add('d-flex', 'justify-content-center',);
    oneClass.innerHTML = 'NÃO HÁ NENHUMA TURMA CADASTRADA';
    divClassesSchedule.appendChild(oneClass)
}

buttonAddSchedule.addEventListener('click', async () => {

    const classElement: HTMLInputElement = document.querySelector('.input-class')!;
    const titleElement: HTMLInputElement = document.querySelector('.input-title')!;
    const messageElement: HTMLTextAreaElement = document.querySelector('.input-message')!;    

    let classId = Number((classElement.value).split('-', 1))
    let title = titleElement.value
    let message = messageElement.value

    let response = await postShedules(message, title, classId)

    if(response.status != 200){
        alert(response.message)
        return
    }

    if(response.status === 200){
        alert('Lembrete adicionado com sucesso!')
        window.location.href = `http://127.0.0.1:5500/frontend/src/pages/teacher/schedule-teacher.html`
        return
    }
})

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

            const newSchedule = document.createElement('div');
            newSchedule.classList.add('p-1', 'schedule-item');
            newSchedule.id = `accordion${index+1}`
            newSchedule.innerHTML = `
                <div>
                    <h5>${schedule.schedule_date}</h5>
                    <p>${schedule.title}</p>
                </div>
                <span class="material-symbols-outlined" id="viewSchedule-${schedule.id}">
                visibility
                </span>
            `;

            oneClass.appendChild(newSchedule);

            let viewSchedule = document.getElementById(`viewSchedule-${schedule.id}`)!

            viewSchedule.addEventListener('click', () => {

                var modal = document.getElementById("viewModal") as HTMLElement;
                var classShedule = document.getElementById("input-vw-class") as HTMLInputElement;
                var titleSchedule = document.getElementById("input-vw-title") as HTMLInputElement;
                var messageSchedule = document.getElementById("input-vw-message") as HTMLInputElement;
                var classes = JSON.parse(localStorage.getItem('classes')!);
                var position = (oneClass.parentElement?.id!).split('-', 2)[1]

                if (!modal) {
                    console.error("Elemento modal não encontrado");
                    return;
                }
            
                let closeButton = document.getElementsByClassName("close-vw")[0] as HTMLElement;

                
                
                modal.style.display = "block";
                classShedule.value = `${classes.data[position].id} - ${classes.data[position].name}`
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
async function postShedules(message: String | undefined, title: String | undefined, classId: Number | undefined) {
    try {


        if(!classId){
            throw new Error('Informe o ID da turma!')
        }

        if(!title){
            throw new Error('Informe o título do lembrete!')
        }

        if(!message){
            throw new Error('Informe a mensagem do lembrete!');

        }

        const response = await axios.post('http://localhost:3000/api/schedule', {
            "message": message,
            "title": title,
            "class": classId
        })

        return response
    } catch (error) {
        return error
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
  