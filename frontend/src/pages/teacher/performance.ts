//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
var classe = 1
teachersStudents(classe);
const classesSchedule = document.querySelector('.classes-schedule');
async function teachersStudents(classId: number) {
   try {
      const response = await axios.post('http://localhost:3000/api/student/class', {
         classId: classId
      });
      const students = response.data[0];
      console.log(students);

      // var studentDiv = document.createElement('div');
      // var className = document.createElement('h5');
      // className.textContent = (`Alunos turma ${classId}`);
      students.forEach((student: any) => {
         console.log(student);
         
         var studentDiv = document.createElement('div');
         studentDiv.classList.add('class-one-schedule')
         var className = document.createElement('h5');
         className.textContent += (`${student.name} ${student.last_name}`);
         var ratingDiv = document.createElement('div');
         ratingDiv.classList.add('rating');
         console.log(student.name, student.last_name);

         for (let i = 10; i > 0; i--) {
            const input = `<input type="radio" id="star${i}" name="rating" value="${i}">`;
            const label = `<label for="star${i}"><i class="fas fa-star"></i></label>`;
            ratingDiv.innerHTML += (input + label);
         }

         studentDiv.appendChild(className);
         studentDiv.appendChild(ratingDiv);
         classesSchedule?.appendChild(studentDiv)
      });


   } catch (error) {

   }
}

document.getElementById('bntSubmit')?.addEventListener('click', async () => {
   var selectedRating = document.querySelector('input[name="rating"]:checked');
   if (selectedRating == null) {
      // selectedRating = 0;
      // await evaluateClass(studentId,0,evaluation_date);
      await teachersStudents(classe);
   } else {
      // await evaluateClass(studentId,selectedRating.value,evaluateClass)
      await teachersStudents(classe);

   }
})


async function evaluateClass(studentId: number, note: number, evaluation_date: Date) {
   try {
      const response = await axios.post('http://localhost:3000/api/evaluation', {
         student: studentId,
         note: note,
         evaluation_date: evaluation_date
      })

   } catch (error) {

   }
}