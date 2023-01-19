window.onload = function () {
    ShowData();
}


function ShowData() {
    var data_el = document.querySelector("#data");
    var content = document.querySelector(".inner-content");

    var data = JSON.parse(data_el.textContent);
    data_el.parentNode.removeChild(data_el);

    var item;
    for (i=0; i < data.length; i += 1) {
        item = data[i];
        content.innerHTML += '<div class="articl"><img src="static/img/'+item[2]+'" class="articl-img"><div class="articl-text"><a href="http://localhost:8080/articls/'+item[3]+'" class="articl-title">'+item[0]+'</a><div class="articl-description">'+item[1]+'</div></div></div>'
    }
}