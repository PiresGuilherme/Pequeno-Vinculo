const token = localStorage.getItem('login');
if (!token) {
  window.location.href = "/frontend/src/pages/initial-login.html";
}


var performanceChild = document.getElementById("childPerformance") as HTMLElement;
performanceChild.addEventListener("click", ()=> {
    performanceChild.style.maxHeight = (performanceChild.style.maxHeight === "0px") ? performanceChild.scrollHeight + "px" : "0px";
}
)

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