import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
getStudentInfo()
async function getStudentInfo(){
    try{
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get('id');
        let student = await axios.post(`http://localhost:3000/api/student/${idParam}`)
        console.log(student.data);
        let tbody = document.getElementById('tbody');
        let newth = document.createElement('th');
        newth.textContent = `${student.data.id}`
        let tdName = document.createElement('td');
        tdName.textContent = `${student.data.name}`
        let tdLast = document.createElement('td');
        tdLast.textContent = `${student.data.last_name}`
        let tdBDay = document.createElement('td');
        tdBDay.textContent = `${student.data.birth_date}`
        let tdDocument = document.createElement('td');
        tdDocument.textContent = `${student.data.document}`

        tbody.appendChild(newth);
        tbody.appendChild(tdName);
        tbody.appendChild(tdLast);
        tbody.appendChild(tdBDay);
        tbody.appendChild(tdDocument);
    }catch(error){
        console.log(error.message);
    }
}