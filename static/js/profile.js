var i = 1;


window.onload = function () {
    CheckCookie();
}



function ExitForAccount() {
    document.cookie = 'password="a";max-age=-1';
    document.cookie = 'login="a";max-age=-1';
    document.cookie = 'username="a";max-age=-1';

    alert("Вы успешно вышли из аккаутна!");
    location.href = "http://localhost:8080"
}

function CheckCookie() {
    var cook = readCookie("login");
    
    if (String(cook) != "undefined") {
        GetCookie();
    }else if (String(cook) === "undefined") {
        var content = document.querySelector(".inner-content");
        content.innerHTML = '<p>У вас нет аккаунта. <a href="http://localhost:8080/account/login">Войдите</a> в свой аккаунт или <a href="http://localhost:8080/account/register/1">зарегистрируйтесь</a> на сайте.</p>'
    }
}

function GetCookie() {
    var name = readCookie("username");
    var login = readCookie("login");
    var password = readCookie("password");
    
    var input1 = document.querySelector(".password");
    var input2 = document.querySelector(".login");
    var input3 = document.querySelector(".main-title");

    input1.value = password;
    input2.value = login;
    input3.textContent = name;
}


function ShowPassword () {
    var pass = document.querySelector(".password");
    var button = document.querySelector(".showpass");

    if (i % 2 == 0) {
        pass.setAttribute('type', 'password');
        button.innerHTML = "Показать пароль";
    }else if (i % 2 == 1) {
        pass.setAttribute('type', 'text');
        button.innerHTML = "Скрыть пароль";
    }
    i += 1;
}





function readCookie(name) {

	var name_cook = name+"=";
	var spl = document.cookie.split(";");
	
	for(var i=0; i<spl.length; i++) {
	
		var c = spl[i];
		
		while(c.charAt(0) == " ") {
		
			c = c.substring(1, c.length);
			
		}
		
		if(c.indexOf(name_cook) == 0) {
			
			return c.substring(name_cook.length, c.length);
			
		}
		
	}
}