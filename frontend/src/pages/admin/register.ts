//@ts-ignore
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

var btnRegister = document.querySelector('.register-info-btn');
btnRegister?.addEventListener('click', () => {
    const name = document.querySelector('.input-name') as HTMLInputElement;
    const lastName = document.querySelector('.input-surname') as HTMLInputElement;

    const street = document.querySelector('.input-street') as HTMLInputElement;
    const addressNumber = document.querySelector('.input-adress-number') as HTMLInputElement;
    const neighborhood = document.querySelector('.input-neighborhood') as HTMLInputElement;
    const city = document.querySelector('.input-city') as HTMLInputElement;

    const addressComplement = document.querySelector('.input-complement') as HTMLInputElement;
    const postalcode = document.querySelector('.input-postalcode') as HTMLInputElement;
    const country = document.querySelector('.input-country') as HTMLInputElement;

    const birthdate = document.querySelector('.input-birthdate') as HTMLInputElement;
    const cpf = document.querySelector('.input-cpf') as HTMLInputElement;
    const telephone = document.querySelector('.input-telephone') as HTMLInputElement;
    const email = document.querySelector('.input-email') as HTMLInputElement;
    const password = document.querySelector('.input-password') as HTMLInputElement;

    let areaCode, phoneNumber;
    if (telephone.value.includes("-")) {
        const telephoneParts = telephone.value.split('-');
        areaCode = parseInt(telephoneParts[0]);
        phoneNumber = parseInt(telephoneParts[1]);
    } else {
        areaCode = parseInt(telephone.value.substring(0, 2));
        phoneNumber = parseInt(telephone.value.substring(2));
    }
// console.log(birthdate.value);
//     console.log(name.value);
//     console.log(lastName.value);
//     console.log(street.value);
//     console.log(adressNumber.value);
//     console.log(neighborhood.value);
//     console.log(city.value);
//     console.log(adressComplement.value);
//     console.log(postalcode.value);
    console.log(country.value);
//     console.log(birthdate.value);
//     console.log(cpf.value);
//     console.log(telephone.value);
//     console.log(email.value);
//     console.log(password.value);
    
    var user = {
        name: name.value, 
        last_name: lastName.value,
        country_code:55,
        area_code: areaCode,
        phone_number: phoneNumber,
        address_country: country.value,
        address_city: city.value,
        address_neighborhood: neighborhood.value,
        address_street: street.value,
        address_complement: addressComplement.value,
        postal_code: postalcode.value,
        document: cpf.value,
        email: email.value,
        password: password.value,
        birth_date: birthdate.value,
        type_user: "TEACHER"
        // address_number: addressNumber.value,
    }
    console.log(user);
    
    registerUser(user);
    // registerUser(user);
})

async function registerUser(user:object){
    try {
        console.log(user);
        
        const response = await axios.post(`http://localhost:3000/api/user`,{
            user:user
        })
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }
}
