let teachersList:any = [];

(async function fetchTeachers() {
    try {
        const response = await fetch(`http://localhost:3000/api/user/teachers`);
        console.log(response);
        
        teachersList = await response.json();
    } catch (error:any) {
        console.error('Erro ao buscar professores:', error.message);
    }
})();

// Elementos HTML
const professorInput = document.getElementById('professorInput') as HTMLInputElement;
const professorList = document.getElementById('professorList') as HTMLElement;

// Evento de digitação no campo de entrada

professorInput.addEventListener('input', function() {
    const searchTerm = professorInput.value.trim();

    if (searchTerm.length < 1) {
        professorList.innerHTML = '';
        return;
    }

    const filteredTeachers = teachersList.filter((teacher:any) => {
        const fullName = `${teacher.name} ${teacher.last_name}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    professorList.innerHTML = '';

    filteredTeachers.forEach((teacher:any) => {
        const professorItem = document.createElement('div');
        professorItem.textContent = `${teacher.name} ${teacher.last_name}`;
        professorItem.classList.add('professor-item');

        professorItem.addEventListener('click', function() {
            professorInput.value = `${teacher.name} ${teacher.last_name}`;
            professorList.innerHTML = '';
        });

        professorList.appendChild(professorItem);
    });
});