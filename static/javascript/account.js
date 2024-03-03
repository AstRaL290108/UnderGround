function sendError(text) {
    let elements = document.querySelectorAll(".error");
    for (element of elements) {
        element.textContent = text;
    }
}
function clearErrors() {
    let elements = document.querySelectorAll(".error");
    for (element of elements) {
        element.textContent = "";
    }
}

function validateEmail(email) {
    const expression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return expression.test(String(email).toLowerCase());
}

function singIn() {
    let login = document.querySelector(".login.sing-in").value;
    let password = document.querySelector(".password.sing-in").value;
    if (!login || !password) return;

    document.querySelector(".login.sing-in").value = "";
    document.querySelector(".password.sing-in").value = "";

    var req = new XMLHttpRequest();
    req.open("POST", "../../../../account/server/sing-in");
    req.setRequestHeader("Content-Type", "application/json");

    req.onload = () => {
        if (req.response == "none-user") 
            sendError("Пользователя с таким логином не существует!");
        if (req.response == "none-password") 
            sendError("Неверный пароль!");
        
        if (req.response == "complite") location.href = "/"
    }

    let data = `{"login": "${login}", "password": "${password}"}`;
    req.send(data);
}

function startRegister() {
    clearErrors();

    let login = document.querySelector("input.login").value;
    let password1 = document.querySelector("input.password1").value;
    let password2 = document.querySelector("input.password2").value;

    if (!password1 || !password2 || !login) 
        {sendError("Заполните форму полностью!"); return}
    if (!validateEmail(login)) 
        {sendError("Логин записан неверно! Повторите попытку."); return}
    if (password1 != password2) 
        {sendError("Пароли не соответствуют друг другу! Повторите попытку."); return}

    var req = new XMLHttpRequest();
    req.open("POST", "../../../../account/server/register/start");
    req.setRequestHeader("Content-Type", "application/json");

    let data = JSON.stringify({
        login: login,
        password: password1
    });

    req.onload = () => {
        if (req.response == "user-already-register") 
            {sendError("Пользователь с таким логином уже существует!"); return}

        let resp = req.response;
        if (resp == "done")
            location.href = "/account/confirmation"
    }

    req.send(data);
}

function emailConfirmation() {
    let code = document.querySelector("input.approw-code").value;
    if (!code) {sendError("Заполните все поля!"); return}

    var req = new XMLHttpRequest();
    req.open("POST", "../../../../account/server/register/email-approw");
    req.setRequestHeader("Content-Type", "application/json");

    let data = JSON.stringify({
        approw_code: code
    });

    req.onload = () => {
        if (req.response == "none-approw-code") {sendError("Неверный код!"); return}
        if (req.response == "done") 
            location.href = "/account/add-view-data";
    }

    req.send(data);
}


function selectAvatar() {
    let input = document.querySelector(".file-input");
    input.click();
}
function previewAvater(input) {
    let preview = document.querySelector(".avatar-preview");
    let reader = new FileReader();
    let file = input.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
        let avatarSrc = reader.result;
        preview.src = avatarSrc;
    }
}
function addViewData() {
    let name = document.querySelector(".new-name").value;
    let about = document.querySelector(".new-about").value;
    let avatar = document.querySelector(".file-input").files[0];

    let formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("avatar", avatar);

    var request = new XMLHttpRequest();
    request.open("POST", "../../../../account/server/register/add-view-data");
    request.send(formData);
}