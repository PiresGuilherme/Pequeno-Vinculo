//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var btnRegister = document.querySelector('.register-info-btn');
btnRegister?.addEventListener('click', () => {
    const name = document.querySelector('.input-name') as HTMLInputElement;
    const lastName = document.querySelector('input-surname')as HTMLInputElement;

    const street = document.querySelector('input-street')as HTMLInputElement;
    const adressNumber = document.querySelector('input-adress-number')as HTMLInputElement;
    const neighborhood = document.querySelector('input-neighborhood')as HTMLInputElement;
    const city = document.querySelector('input-city')as HTMLInputElement;

    const adressComplement = document.querySelector('input-complement')as HTMLInputElement;
    const postalcode = document.querySelector('input-postalcode')as HTMLInputElement;
    const country = document.querySelector('input-country')as HTMLInputElement;

    const birthdate = document.querySelector('input-birthdate')as HTMLInputElement;
    const cpf = document.querySelector('input-cpf')as HTMLInputElement;
    const telephone = document.querySelector('input-telephone')as HTMLInputElement;
    const email = document.querySelector('input-email')as HTMLInputElement;
    const password = document.querySelector('input-password')as HTMLInputElement;
console.log(birthdate);

    // var user = {};
    // user = (name.value, lastName.value,street.value,adressNumber.value,neighborhood.value,city.value,adressComplement.value,postalcode.value,country.value,birthdate.value,cpf.value,telephone.value,email.value,password.value)
    // console.log(birthdate);
    // registerUser(user);
})


async function registerUser(user:object){
    try {
        console.log(user);
        
        // const response = await axios.post(`http://localhost:3000/api/user`,{
        //     user:
        // })
    } catch (error) {
        
    }
}
