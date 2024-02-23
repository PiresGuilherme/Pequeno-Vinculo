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

        var classesCoin: Array<any> = [];
        await Promise.all(response.data.map(async (classe: any) => {
            birthdayStudents(classe.id);
            const classCoin = await classTotalCoin(classe.id);
            classesCoin.push(classCoin);

        }))

        classesCoin.sort((a: any, b: any) => b[1] - a[1]);
        classesCoin.forEach((classeId: any, index: number) => {
            if (classeId[1] > 0) {
                index++;
                if (index <= 5) {
                    response.data.forEach(async (classe: any) => {
                        if (classe.id == classeId[0]) {
                            const divBestClasses = document.querySelector('.summary-best-classes');
                            let divBests = document.createElement('div');
                            divBests.classList.add('bestClasses');
                            if (index === 1) {
                                divBests.classList.add('gold');
                            } else if (index === 2) {
                                divBests.classList.add('silver');
                            } else if (index === 3) {
                                divBests.classList.add('bronze');
                            }
                            let message = document.createElement('p');
                            message.innerHTML = `${index}ª turma : ${classe.name} com a média dos alunos : ${classeId[1]}`
                            divBests.appendChild(message);
                            divBestClasses?.appendChild(divBests);
                        }
                    })
                }  
            }
        });

        const countClasses = response.data.length
        var countStudents = 0
        for (let i = 0; i < countClasses; i++) {
            let count = await teachersStudents(response.data[i].id);
            countStudents += count.data[1];

        }
        countClassesLine.textContent = countClasses.toString();
        countStudentsLine.textContent = countStudents.toString();
        localStorage.setItem('classes', JSON.stringify(response))
    } catch (error: any) {
        console.log(error.message);
    }
}
async function teachersStudents(classId: number) {
    try {
        const response = await axios.post('http://localhost:3000/api/student/class', {
            classId: classId
        })
        return response;
    } catch (error: any) {
        console.log(error.message);
    }
}
async function birthdayStudents(classId: number) {
    try {
        const response = await axios.get(`${backend}/student/birthday/class/${classId}`);
        const divbirthdays = document.querySelector('.last-info-birthdays');
        response.data.forEach((student: any) => {
            let divBests = document.createElement('div');
            divBests.classList.add('birthdays');
            let message = document.createElement('p');
            message.innerHTML = `Hoje é aniversário do estudante : ${student.name} da turma ${student.classe.name}`;
            divBests.appendChild(message);
            divbirthdays?.appendChild(divBests);
        })
    } catch (error) {
        console.log(error);

    }
}
async function classTotalCoin(classId: number) {
    try {
        const response = await axios.get(`${backend}/class/coins/${classId}`);
        if (response.data == null) {
            response.data = 0;
        };
        return [classId, response.data];
    } catch (error) {
        console.log(error);

    }
}