//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

// import axios from "axios";
let logar = document.querySelector('.login-btn')

logar?.addEventListener('click', () => {
    login();
})
const emailElement = document.getElementById('email') as HTMLInputElement;
const passwordElement = document.getElementById('password') as HTMLInputElement;
const loginInputs = document.getElementById('login-imputs');
const message = document.createElement('p');
loginInputs?.appendChild(message)

export async function login() {
    let emailValue = emailElement.value;
    let passwordValue = passwordElement.value;

    try {
        if (!emailValue || !passwordValue) {
            message.textContent = 'É necessário preencher ambos os campos, E-mail e Senha';
            return;
        }

        const response = await axios.post('http://localhost:3000/api/user/login', {
            email: emailValue,
            password: passwordValue,
        });

        if (response == null) {
            message.textContent = 'Usuário ou senha incorreto';
            return;
        }

        const token = response.data;
        console.log('Token de autenticação:', token);
        if (token.type_user !== "TEACHER") {
            message.textContent = 'Você não é um professor';
            window.location.href = `http://127.0.0.1:5500frontend/src/pages/guardian/login-page-guardian.html`;
        }

        localStorage.setItem("login", JSON.stringify(token));
        window.location.href = `http://127.0.0.1:5500/frontend/src/pages/teacher/dashboard-teacher.html?id=${token.id}`;
    } catch (error: any) {
        let message = document.createElement('p');
        
        if (error.response.status == 404) {
            message.textContent = error.response.data.message;
        } else if (error.response.status == 500) {
            message.textContent = error.message
        } else {
            message.textContent = error.message
        }
    }
}

