//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

let urlParams = new URLSearchParams(window.location.search);
let idParam = urlParams.get('id');
let student = await axios.post(`http://localhost:3000/api/student/${idParam}`)
console.log(student);
