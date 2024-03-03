function resetData(dataTitle) {
    let newData = document.querySelector(`input.${dataTitle}`).value;
    if (!newData) return;
    document.querySelector(`input.${dataTitle}`).value = "";

    var req = new XMLHttpRequest();
    req.open("POST", "../../../../server/reset-userdata");
    req.setRequestHeader("Content-Type", "application/json");

    let data = JSON.stringify({
        dataTitle: dataTitle,
        newData: newData
    });
    req.send(data);
    location.href = location.href;
}

function exit() {
    alert("Вы не можете выйти из данного аккаунта, т.к это прототип!");
}