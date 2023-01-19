window.onload = function () {
    GetContent();
    GetComments ();
    CheckCoolie();
}

function GetContent() {
    var data_el = document.querySelector("#text_content");
    var content = document.querySelector(".inner-content");
    var text = data_el.textContent;
    
    data_el.parentNode.removeChild(data_el);
    content.innerHTML += text;
}

function GetComments () {
    var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/server/get-comment", true);
    req.responseType = "text";

    req.setRequestHeader("Content-Type", "application/json");

    var articl_title = document.querySelector("title").textContent;

    var data = {
        'articl-title': '',
    }

    data['articl-title'] = articl_title;

    var body = JSON.stringify(data);

    req.onload = function () {
        var all_comment = document.querySelector(".all-comment");
        var com_list = JSON.parse(req.response);

        for (i=0; i < com_list.length; i += 1) {
            var item = com_list[i];
            all_comment.innerHTML += '<div class="comment"><div class="com-name">' + item[0] + '</div><div class="com-text">' + item[1] + '</div></div>';
        }
    }

    req.send(body);
}


function CheckCoolie() {
    var cookie = String(readCookie("username"));

    if (cookie == "undefined") {
        var make_com = document.querySelector(".make-comment");
        make_com.parentNode.removeChild(make_com);

        var any = document.querySelector(".comments");
        any.innerHTML += '<p>Чтобы оставлять комментарии вам нужно <a href="http://localhost:8080/account/register/1">авторизоваться</a> на сайте.</p>';
    }
}


function SearchCookie (cookie) {
    cookie = cookie.split(";");
    return cookie
}


function AddComment() {
    var cookie = document.cookie;
    var cookie = SearchCookie(cookie);

    var username = null;
    var input_comment = document.querySelector(".make-comment input").value;

    if (input_comment === "") {
        document.querySelector(".error").textContent = "Комментарий не должен быть пустым!"
    }else {
        document.querySelector(".error").textContent = ""
        var username = readCookie("username");

        var req = new XMLHttpRequest();
        req.open("POST", "http://localhost:8080/server/add-comment", true);
        req.responseType = "text";
        req.setRequestHeader("Content-Type", "application/json");

        var data = {
            'username': '',
            'text': '',
            'articl-title': ''
        }
        data['username'] = username;
        data['text'] = input_comment;
        data['articl-title'] = document.querySelector("title").textContent;
        var body = JSON.stringify(data);

        document.querySelector(".make-comment input").value = ""

        req.onload = function () {
            var all_comment = document.querySelector(".all-comment");
            all_comment.innerHTML += '<div class="comment"><div class="com-name">' + data['username'] + '</div><div class="com-text">' + data['text'] + '</div></div>';
        }

        req.send(body);
    }
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