//@ts-ignore
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm"

// classesPicture(classId);

let urlParams = new URLSearchParams(window.location.search);
let idParam = urlParams.get('id');

let classe = await axios.get(`http://localhost:3000/api/class/${idParam}`);

if (classe.data) {
    classe = classe.data
    classesPicture(classe.id)

}
else {
    const box = document.querySelector('#box');
    const h2 = document.createElement('h1');
    h2.textContent = 'Nenhuma foto cadastrada para esta turma!';
    box?.appendChild(h2);
}

async function classesPicture(classId: number) {
    const div1 = document.getElementById('box') as HTMLElement
    try {
        const response = await axios.get(`http://localhost:3000/api/class/${classId}/picture`);

        if (response.data.length == 0) {
            const box = document.querySelector('#box');
            const h2 = document.createElement('h1');
            h2.textContent = 'Nenhuma foto cadastrada para esta turma!';
            box?.appendChild(h2);
        } else {

            const pictures = response.data;


            pictures.forEach((picture: any) => {
                const image = document.createElement('img');
                const caminho = `${picture.path.replace(/\\/g, '/')}`

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

            div1.addEventListener('click', (selected: any) => {
                const selectedPicture = pictures.find((picture: any) => picture.filename == selected.target.src.replace(/^.*[\\\/]/, ''))

                if (selected.target.tagName === 'IMG') {
                    modal.style.display = "block";
                    modalImg.src = selected.target.src;
                    captionText.innerHTML = `${selectedPicture.description}`
                }
            });
            var closeBtn = document.getElementById("close") as HTMLInputElement;
            closeBtn.onclick = function () {
                modal.style.display = "none";
            };
        }
    } catch (error: any) {
        console.log(error.message);
    }
}