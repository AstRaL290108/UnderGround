window.onload = () => {
    addViews();
}

function addViews() {
    let articlUrl = location.href.split("/");
    articlUrl = articlUrl[articlUrl.length - 1];

    if (sessionStorage.getItem(`view-${articlUrl}`) == 1) return;
    sessionStorage.setItem(`view-${articlUrl}`, 1);

    var req = new XMLHttpRequest();
    req.open("GET", "../../../../server/add-view/"+articlUrl);

    req.onload = () => {}
    req.send();
}


function sendGrade(type) {
    if (sessionStorage.getItem("grade")) return;
    let articlUrl = location.href.split("/");
    articlUrl = articlUrl[articlUrl.length - 1];

    var req = new XMLHttpRequest();
    req.open("POST", "../../../../server/add-grade");
    req.setRequestHeader("Content-Type", "application/json");

    let data = `{"type": "${type}", "url": "${articlUrl}"}`
    req.onload = () => {
        if (!req.response) return;
        sessionStorage.setItem("grade", 1);

        let element = document.querySelector(`.${type}`);
        element.classList.add("active");

        let parent = element.parentElement;
        parent.querySelector(".number").textContent = Number(parent.querySelector(".number").textContent) + 1;
    }
    req.send(data);
}

function DownLoad() {
    let articlUrl = location.href.split("/");
    articlUrl = articlUrl[articlUrl.length - 1];

    if (sessionStorage.getItem(`download-${articlUrl}`) == 1) {
        alert("Вы уже скачали этот файл!");
        let element = document.querySelector("a.download-button");
        element.removeAttribute("download");
        element.removeAttribute("href");

        return;
    }
    sessionStorage.setItem(`download-${articlUrl}`, 1);

    var req = new XMLHttpRequest();
    req.open("POST", "../../../../server/add-download");
    req.setRequestHeader("Content-Type", "application/json");

    let data = `{"url": "${articlUrl}"}`;
    req.send(data);
}