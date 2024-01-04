//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

// import axios from "axios";
let logar = document.querySelector('logar')

logar?.addEventListener('onclick', ()=>{
    console.log('a');
    
    login();
})

 export async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    if (email && password) {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', {
                email: email,
                password: password,
            });
            console.log(response.data);
            console.log(email, password);
            // Se a solicitação for bem-sucedida, você pode lidar com a resposta (por exemplo, armazenar o token)
            const token = response.data.token;
            console.log('Token de autenticação:', token);
            if (response.status === 200) {
                // window.location.href = `/user/${response.data.id}`;
            }
        } catch (error: any) {
            let loginInputs = document.getElementById('login-imputs');
            let errorMessage = document.createElement('p');
            errorMessage.textContent = error.message;
            loginInputs?.appendChild(errorMessage);
        }
    }
}
