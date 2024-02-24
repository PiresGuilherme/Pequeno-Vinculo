//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const back = "http://localhost:3000/api"
let teachersList: any = [];

(async function fetchTeachers() {
    try {
        const response = await axios.get(`${back}/user/teachers`);
        response.data.forEach((teacher: object) => {
            teachersList.push(teacher)
        })
    } catch (error: any) {
        console.error('Erro ao buscar professores:', error.message);
    }
})();

const professorInput = document.getElementById('professorInput') as HTMLInputElement;
const professorList = document.getElementById('professorList') as HTMLElement;

professorInput.addEventListener('input', () => {
    const searchTerm = professorInput.value.trim();

    if (searchTerm.length < 1) {
        professorList.innerHTML = '';
        return;
    }

    const filteredTeachers = teachersList.filter((teacher: any) => {
        const fullName = `${teacher.id} ${teacher.name} ${teacher.last_name}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    professorList.innerHTML = '';

    filteredTeachers.forEach((teacher: any) => {
        
        const professorItem = document.createElement('div');
        professorItem.textContent = `${teacher.name} ${teacher.last_name}`;
        professorItem.classList.add('professor-item');

        professorItem.addEventListener('click', function () {
            
            professorInput.value = `${teacher.name} ${teacher.last_name}`;
            professorList.innerHTML = '';
            var idTeacher = document.querySelector('#id-teacher') as HTMLInputElement;
            idTeacher.value = teacher.id;
            
        });

        professorList.appendChild(professorItem);
    });
});

const btnRegisterClass = document.querySelector('.register-info-btn');

btnRegisterClass?.addEventListener('click', async () => {
    try {
        const name = document.querySelector('.input-name') as HTMLInputElement;
        const shift = document.querySelector('.input-shift') as HTMLInputElement;
        const capacity = document.querySelector('.input-capacity') as HTMLInputElement;
        const teacher = document.querySelector('#id-teacher') as HTMLInputElement;
        

        const response =  await axios.post(`${back}/class`, {
            name:name.value,
            shift:shift.value,
            capacity:capacity.value,
            user:teacher.value
        });

    } catch (error) {
        
    }
})