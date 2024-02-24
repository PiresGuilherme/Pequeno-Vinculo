const token = localStorage.getItem('login');
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}

//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm"

// classesPicture(classId);

let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get('id');
    console.log(idParam);
    
    let classe = await axios.get(`http://localhost:3000/api/class/${idParam}`);
    
    if (classe.data) {
        classe = classe.data
        classesPicture(classe.id)
        console.log(classe.id);
        
    }
    else {
        console.log("não há nenhuma foto cadastrada para esta turma ainda!");
        const box = document.querySelector('#box');
        const h2 = document.createElement('h1');
        h2.textContent = 'Nenhuma foto cadastrada para esta turma ainda!';
        box?.appendChild(h2); 
    }

async function classesPicture(classId:number) {
    const div1 = document.getElementById('box') as HTMLElement
    try {
        const response = await axios.get(`http://localhost:3000/api/class/${classId}/picture`);
        console.log(response.data);
        
        // if (condition) {
            
        // }
        const pictures = response.data;

        
        pictures.forEach((picture : any) => {
            const image = document.createElement('img');
            const caminho = `${picture.path.replace(/\\/g, '/')}`
            console.log(caminho);
            
            image.setAttribute('src', `../../../../backend/${caminho}`)
            image.setAttribute('width', '300');
            image.setAttribute('height', '300');
            image.setAttribute('alt', 'foto da turma');
            image.setAttribute('class', 'foto shadow bg-body-tertiary rounded');

            div1.appendChild(image)

        });

        var modal = document.getElementById("myModal")!;
        var modalImg = document.getElementById("modalImage") as HTMLImageElement;
        var captionText = document.getElementById("caption")!;

        div1.addEventListener('click', (selected:any) => {
            console.log(selected.target.src.replace(/^.*[\\\/]/, ''));
            const selectedPicture = pictures.find((picture:any) =>  picture.filename == selected.target.src.replace(/^.*[\\\/]/, '')) 

            if (selected.target.tagName === 'IMG') {
                modal.style.display = "block"  ;
                modalImg.src = selected.target.src;
                captionText.innerHTML = `${selectedPicture.description}`
            }
        });
        var closeBtn = document.getElementById("close") as HTMLInputElement;
        closeBtn.onclick = function () {
            modal.style.display = "none";
        };
    } catch (error:any) {
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