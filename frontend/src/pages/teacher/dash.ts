//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
const backend = "http://localhost:3000/api"

const countClassesLine = document.getElementById('countClasses') as HTMLParagraphElement;
const countStudentsLine = document.getElementById('countStudents') as HTMLParagraphElement;

const userJson = localStorage.getItem('login');

const colorPalette = ['#DCC1FC', '#FF708D', '#FEC868', '#A3E487'];
let colorIndex = 0;

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
        var bestsStudents: Array<any> = [];
        await Promise.all(response.data.map(async (classe: any) => {
            birthdayStudents(classe.id);
            const classCoin = await classTotalCoin(classe.id);
            classesCoin.push(classCoin);
            const bestStudent = await bestStudents(classe.id);
            bestsStudents.push(bestStudent);
        }))
        bestsStudents.sort((a: any, b: any) => b.coin - a.coin)
        const divBestStudents = document.querySelector('.last-info-best-students') as HTMLElement
        bestsStudents.forEach(async (student: any, index: number) => {
            if (student.coin > 0) {
                index++;
                if (index <= 5) {

                    let divBests = document.createElement('div');
                    divBests.classList.add('best-students');
    
                    let studentInfo = document.createElement('p');
                    var average = await axios.get(`${backend}/evaluate/average/${student.id}`);
                    average = average.data;
    
                    var media = ``;
                    if (average == null || average == 0) {
                        media = `Nenhuma nota cadastrada!`
                    } else {
                        media = `${average.toFixed(2)} / 5`
                    }
                    studentInfo.innerHTML = `<strong>Nome:</strong>
                    <p> ${student.name}</p> <strong>Média:</strong> <p>${media}</p>`;

                    divBests.appendChild(studentInfo);
                    divBests.style.backgroundColor = colorPalette[colorIndex];
                    colorIndex = (colorIndex + 1) % colorPalette.length;
                    divBestStudents.appendChild(divBests);
                }
            }
        })
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
                                var goldMedal = document.createElement('img');
                                goldMedal.src = 'medal-gold.svg';
                                goldMedal.classList.add('gold');
                                goldMedal.style.width = '40px';
                                goldMedal.style.height = '40px';
                                divBests.appendChild(goldMedal);
                            } else if (index === 2) {
                                var silverMedal = document.createElement('img');
                                silverMedal.src = 'medal-silver.svg';
                                silverMedal.classList.add('silver');
                                silverMedal.style.width = '40px';
                                silverMedal.style.height = '40px';
                                divBests.appendChild(silverMedal);
                            } else if (index === 3) {
                                var bronzeMedal = document.createElement('img');
                                bronzeMedal.src = 'medal-bronze.svg';
                                bronzeMedal.classList.add('bronze');
                                bronzeMedal.style.width = '40px';
                                bronzeMedal.style.height = '40px';
                                divBests.appendChild(bronzeMedal);
                            }
                            let message = document.createElement('p');
                            let media: number = classeId[1];
                            message.innerHTML = `${index}ª turma: ${classe.name} com a média dos alunos: ${media.toFixed(1)}`;
                            divBests.style.backgroundColor = colorPalette[colorIndex];
                            colorIndex = (colorIndex + 1) % colorPalette.length;
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

async function bestStudents(classId: number) {
    try {
        const response = await axios.get(`${backend}/class/${classId}/best/student`);
        // console.log(response);
        return response.data
    } catch (error) {

    }
}