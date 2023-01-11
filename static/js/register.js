function AddMainData() {
    var username = document.querySelector(".input-ferstname").value + " " + document.querySelector(".input-lastname").value;
    var login = document.querySelector(".input-login").value;

    var pass1 = document.querySelector(".input-password").value;
    var pass2 = document.querySelector(".input-db_password").value;

    var result = CheckForm([username, login, pass1, pass2]);
    if (result === "nice") {
        var req = new XMLHttpRequest();
        url = "http://localhost:8080/server/add-main-info"
        req.open("POST", url);

        data = {
            'username': '',
            'login': '',
            'password': ''
        }
        data['username'] = username;
        data['login'] = login;
        data['password'] = pass1;

        body = JSON.stringify(data);

        req.responceType = "text";
        req.setRequestHeader("Content-Type", "application/json");

        req.onload = function () {
            if (req.response === "411") {
                document.querySelector(".error").innerHTML = "Такое имя или фамилия уже существует!";
            }else if (req.response === "412") {
                document.querySelector(".error").innerHTML = "Такой логин уже существует!";
            }else {
                location.href = req.response;
            }
        }
        req.send(body);
    }
}


function CheckForm(list) {
    if (list[2] != list[3]) {
        document.querySelector(".error").innerHTML = "Пароли в двух формах должны совпадать!";
    }else if (list[0] === "" || list[1] === "" || list[2] === "" || list[3] === "") {
        document.querySelector(".error").innerHTML = "Все поля формы должны быть заполнены соответствующими значениями!";
    }else if (list[1].match(/@/) === '') {
        document.querySelector(".error").innerHTML = "Введён неверный адрес!";
    }else {
        document.querySelector(".error").innerHTML = "";
        var a = ChekPassword(list[2]);
        if (a === 'nice') {
            return "nice";
        }else {
            return null;
        }   
    }
}


function ChekPassword(pass) {
    var sh1 = /\d/
    var sh2 = /[@#$%&*]/

    let a = pass.match(sh1);
    let b = pass.match(sh2);

    if (a == null) {
        document.querySelector(".error").innerHTML = "Пароль должен содержать хотябы одну цифру!";
    }else if (b == null) {
        document.querySelector(".error").innerHTML = "Пароль должен содержать хотябы один специальный символ (@#$%&*)!";
    }else {
        return "nice";
    }
}



//Step Two
function CheckLitter() {
    var req = new XMLHttpRequest();
        url = "http://localhost:8080/server/chek-litter"
        req.open("POST", url);

        data = {
            'login': '',
            'input-key': ''
        }
        data['login'] = location.href.slice(41);
        data['input-key'] = document.querySelector(".input-key").value;

        body = JSON.stringify(data);

        req.responceType = "json";
        req.setRequestHeader("Content-Type", "application/json");

        req.onload = function () {
            var data = JSON.parse(req.response);
            if (data['username'] === "413") {
                document.querySelector(".error").innerHTML = "Введён неверный код!";
            }else {
                document.cookie = 'username='+data['username']+';max-age=999999;path=/';
                document.cookie = 'login='+data['login']+';max-age=999999;path=/';
                document.cookie = 'password='+data['password']+';max-age=999999;path=/';
                
                alert("Регистрация успешно завершена!")
                location.href = "http://localhost:8080"
            }
        }
        req.send(body);
}