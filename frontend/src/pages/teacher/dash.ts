//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const backend = "http://localhost:3000/api"

const countClassesLine = document.getElementById('countClasses') as HTMLParagraphElement;
const countStudentsLine = document.getElementById('countStudents') as HTMLParagraphElement;

const userJson = localStorage.getItem('login');

if (userJson) {
    const user = JSON.parse(userJson);
    teacherClasses(user.user.id)
}
async function teacherClasses(userId: number) {
    try {
        const response = await axios.post('http://localhost:3000/api/class/teacher', {
            userId: userId
        })
        // console.log(response);

        response.data.forEach(async (classe: any) => {

            birthdayStudents(classe.id);
            classTotalCoin(classe.id)
            // console.log(1);

        })
        // console.log(birthdayStudents);

        const countClasses = response.data.length
        var countStudents = 0
        for (let i = 0; i < countClasses; i++) {
            let count = await teachersStudents(response.data[i].id);
            countStudents += count.data[1];
            // console.log(response.data[i].id);
        }
        // console.log(countStudents);

        countClassesLine.textContent = countClasses.toString();
        // console.log(countClasses);

        countStudentsLine.textContent = countStudents.toString();
        localStorage.setItem('classes', JSON.stringify(response))
    } catch (error: any) {
        console.log(error.message);
    }
}
async function teachersStudents(classId: number) {
    try {
        // console.log(classId);
        const response = await axios.post('http://localhost:3000/api/student/class', {
            classId: classId
        })
        // console.log(response.data[1]);
        return response;
    } catch (error: any) {
        console.log(error.message);
    }


}
async function birthdayStudents(classId: number) {
    try {
        const response = await axios.get(`${backend}/student/birthday/class/${classId}`)
        const divbirthdays = document.querySelector('.last-info-birthdays');
        // console.log(2);
        // console.log(response);

        response.data.forEach((student: any) => {

            let divBests = document.createElement('div');
            divBests.classList.add('birthdays');

            let message = document.createElement('p');
            message.innerHTML = `Hoje é aniversário do estudante : ${student.name} da turma ${student.classe.name}`


            divBests.appendChild(message);

            divbirthdays?.appendChild(divBests)
        })
    } catch (error) {
        console.log(error);

    }
}
async function classTotalCoin(classId: number) {
    try {       
        const response = await axios.get(`${backend}/class/coins/${classId}`)
        console.log(response);
        
    } catch (error) {
        console.log(error);

    }
}