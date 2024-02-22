//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const buttonAddPhoto = document.querySelector('.add-photo-button') as HTMLButtonElement;
const classesJson = localStorage.getItem('classes');
const divClassesGallery = document.querySelector('.classes-gallery') as HTMLDivElement;
const frontend = "http://127.0.0.1:5500/frontend/src/pages"
const colorPalette = ['#FEC868', '#FF708D', '#DCC1FC', '#A3E487'];
let colorIndex = 0;

if (classesJson) {
    const classes = JSON.parse(classesJson);
    
    for (let i = 0; i < classes.data.length; i++) {
        let oneClass = document.createElement('div');
        oneClass.classList.add('class-gallery');
        console.log(classes.data.id);
        oneClass.innerHTML = `
         <h5>Agenda ${classes.data[i].name}</h5>
         <div>
            <span class="material-symbols-outlined" id="${classes.data.id}">
                photo_library
            </span>
            <span class="material-symbols-outlined" id="add-button${i + 1}">
                add
            </span>
        </div>`

        oneClass.style.backgroundColor = colorPalette[colorIndex];
        colorIndex = (colorIndex + 1) % colorPalette.length;
        divClassesGallery.appendChild(oneClass);
        
        document.getElementById(`${classes.data.id}`)?.addEventListener('click', async function (event: MouseEvent) {
            console.log(classes.data.id);
            window.location.href = `${frontend}/teacher/gallery-dashboard-teacher.html?id=${classes.data[i].id}`
        });

        document.addEventListener('DOMContentLoaded', () => {
            var modal = document.getElementById("myModal") as HTMLElement;
        
            if (!modal) {
                console.error("Elemento modal não encontrado");
                return;
            }
        
            var closeButton = document.getElementsByClassName("close")[0] as HTMLElement;
            var addButton = document.getElementById(`add-button${i + 1}`) as HTMLElement;
        
            addButton.onclick = function () {
                modal.style.display = "block";
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
    // getClassSchedules(classes.data.id);
} else {
    let oneClass = document.createElement('div');
    oneClass.classList.add('d-flex', 'justify-content-center',);
    oneClass.innerHTML = 'NÃO HÁ NENHUMA TURMA CADASTRADA';
    divClassesGallery.appendChild(oneClass)
}


buttonAddPhoto.addEventListener('click', async () => {
    const classElement: HTMLInputElement | null = document.querySelector('.input-class');
    const messageElement: HTMLTextAreaElement | null = document.querySelector('.input-message');
    const pictureElement: HTMLInputElement | null = document.querySelector('#fileInput');    

    if(!Number(classElement?.value)){
        alert('Informe o ID da turma!')
        return;
    }

    if(messageElement?.value === ''){
        alert('Informe a legenda da foto!')
        return;
    }

    if(!pictureElement?.files?.length){
        alert('Insira a foto!')
        return;
    }

    const classId = Number(classElement?.value);
    const description = messageElement?.value;
    const picture = pictureElement?.files?.[0];

    try {
        const response = await postPhotos(description, classId, picture);

        if(response.status === 200){
            alert('Foto adicionada com sucesso!')
            window.location.href = `http://127.0.0.1:5500/frontend/src/pages/teacher/gallery-teacher.html`;
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar foto');
    }
});

async function postPhotos(description: string | undefined, classId: number | undefined, picture: any) {
    try {
        if (classId === undefined) {
            alert('Informe o ID da turma!');
            return;
        }

        if (description === undefined) {
            alert('Informe a legenda da foto!');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        formData.append('class', String(classId));
        formData.append('picture', picture);

        const response = await axios.post(`http://localhost:3000/api/class/${classId}/picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        return error;
    }
}
