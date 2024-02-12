//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
var classe = 1
teachersStudents(classe);
const classesSchedule = document.querySelector('.classes-performances');
console.log(classesSchedule);

async function teachersStudents(classId: number) {
   try {
      const response = await axios.post('http://localhost:3000/api/student/class', {
         classId: classId
      });
      const students = response.data[0];
      console.log(students);

      var classDiv = document.createElement('div');
      classDiv.classList.add('class-performance')
      var className = document.createElement('h5');
      className.textContent += `Turma ${classId}`
      var btnSubmit = document.createElement('button');
      btnSubmit.type = 'button';
      btnSubmit.id = 'btnSubmit';
      btnSubmit.textContent = 'Avaliar'

      classDiv.appendChild(className);
      classDiv.appendChild(btnSubmit);
      classesSchedule?.appendChild(classDiv)
      // console.log(classDiv);
      
      students.forEach((student: any) => {
         // console.log(student);
         var studentDiv = document.createElement('div');
         studentDiv.classList.add('class-performance')
         var studentName = document.createElement('h5');
         studentName.textContent += (`${student.name} ${student.last_name}`);
         var ratingDiv = document.createElement('div');
         ratingDiv.classList.add('rating');
         // console.log(student.name, student.last_name);

         for (let i = 5; i > 0; i--) {
            const input = `<input type="radio" id="star${i}-${student.id}" name="${student.id}" value="${i}">`;
            const label = `<label for="star${i}-${student.id}"><i class="fas fa-star"></i></label>`;
            ratingDiv.innerHTML += (input + label);
         }
         studentDiv.appendChild(studentName);
         studentDiv.appendChild(ratingDiv);
         classesSchedule?.appendChild(studentDiv)
      })

      document.getElementById('btnSubmit')?.addEventListener('click', async function () {
         students.forEach(async (student:any) => {
            
            var selectedRating = document.querySelector(`input[name="${student.id}"]:checked`) as HTMLInputElement;
            // console.log(selectedRating.value);
            // var note = Number(selectedRating.value);
            // console.log(student.id);
            
            var nowDate = new Date();
            if (selectedRating == null) {
                     // selectedRating = 0;
                     await evaluateClass(student.id,0,nowDate);
                     // await teachersStudents(classe);
                  } else {
                     await evaluateClass(student.id,Number(selectedRating.value),nowDate)
                     // await teachersStudents(classe);
                     
                  }
         })

      });



      // var studentDiv = document.createElement('div');
      // var className = document.createElement('h5');
      // className.textContent = (`Alunos turma ${classId}`);
      // students.forEach((student: any) => {
      //    console.log(student);

      //    var studentDiv = document.createElement('div');
      //    studentDiv.classList.add('class-one-schedule')
      //    var studentName = document.createElement('h5');
      //    studentName.textContent += (`${student.name} ${student.last_name}`);
      //    var ratingDiv = document.createElement('div');
      //    ratingDiv.classList.add('rating');
      //    console.log(student.name, student.last_name);

      //    for (let i = 10; i > 0; i--) {
      //       const input = `<input type="radio" id="star${i}" name="${student.name}" value="${i}">`;
      //       const label = `<label for="star${i}"><i class="fas fa-star"></i></label>`;
      //       ratingDiv.innerHTML += (input + label);
      //    }

      //    studentDiv.appendChild(className);
      //    studentDiv.appendChild(ratingDiv);
      //    classesSchedule?.appendChild(studentDiv)
      // });


   } catch (error) {

   }
}

// document.getElementById('btnSubmit')?.addEventListener('click', function () {
//    var selectedRating = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
//    console.log(selectedRating.name);

//    var countStudents

// //    if (selectedRating == null) {
// //       // selectedRating = 0;
// //       // await evaluateClass(studentId,0,evaluation_date);
// //       await teachersStudents(classe);
// //    } else {
// //       // await evaluateClass(studentId,selectedRating.value,evaluateClass)
// //       await teachersStudents(classe);

// //    }
// })


async function evaluateClass(studentId: number, note: number, evaluation_date: Date) {
   try {
      const response = await axios.post('http://localhost:3000/api/evaluation', {
         student: studentId,
         note: note,
         evaluation_date: evaluation_date
      })
      return 
   } catch (error) {

   }
}