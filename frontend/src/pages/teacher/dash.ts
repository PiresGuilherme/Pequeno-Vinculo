const token = localStorage.getItem('login');
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}

//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

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
        const countClasses = response.data.length
        var countStudents = 0
        for (let i = 0; i < countClasses; i++) {
            let count = await teachersStudents(response.data[i].id);
            countStudents += count.data[1];
        }
        console.log(countStudents);
        
        countClassesLine.textContent = countClasses.toString();
        console.log(countClasses);
        
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
        console.log(response.data[1]);
        return response;
    } catch (error: any) {
        console.log(error.message);
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