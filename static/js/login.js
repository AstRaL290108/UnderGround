function EnterData() {
    var login = document.querySelector(".input-login").value;
    var password = document.querySelector(".input-password").value;

    var req = new XMLHttpRequest();
    url = "http://localhost:8080/server/login"
    req.open("POST", url);

    data = {
        'login': '',
        'password': ''
    }
    data['login'] = login;
    data['password'] = password;

    body = JSON.stringify(data);

    req.responceType = "json";
    req.setRequestHeader("Content-Type", "application/json");

    req.onload = function () {
        data = JSON.parse(req.response);
        console.log(data)
        if (data['username'][0] != "e") {
            document.cookie = 'username='+data['username']+';max-age=999999;path=/';
            document.cookie = 'login='+data['login']+';max-age=999999;path=/';
            document.cookie = 'password='+data['password']+';max-age=999999;path=/';

            location.href = "http://localhost:8080"
            alert("Вход выполнен успешно!")
        }else if (data['username'] === "e421") {
            document.querySelector(".error").innerHTML = "Неверный логин или пароль!";
        }
    }
    req.send(body);
}