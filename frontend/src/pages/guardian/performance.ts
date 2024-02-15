var performanceChild = document.getElementById("childPerformance") as HTMLElement;
performanceChild.addEventListener("click", ()=> {
    performanceChild.style.maxHeight = (performanceChild.style.maxHeight === "0px") ? performanceChild.scrollHeight + "px" : "0px";
}
)
