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
        content.innerHTML += '<div class="articl"><a href="articls/' + item[3] + '" class="articl-title">' + item[0] + '</a><div class="articl-description">' + item[1] + '</div><div class="articl-PublicTime">' + item[2] + '</div> </div>'
    }
}