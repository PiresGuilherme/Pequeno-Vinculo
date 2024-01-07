//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';


const classesJson = localStorage.getItem('classes');

if (classesJson) {
    const classes = JSON.parse(classesJson);
    getClassSchedules(classes.id)
}

async function getClassSchedules(classId: number){
    const schedules = await axios.get(`http://localhost:3000/api/schedule/${classId}`)
}