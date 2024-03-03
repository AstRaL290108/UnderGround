class Messendger {
    constructor() {
        this.socket = io.connect();

        this.articlUrl = location.href.split("/");
        this.articlUrl = this.articlUrl[this.articlUrl.length - 1];
        this.socket.emit("messages-ping", {url: this.articlUrl});

        this.socket.on("message-load", this.loadMessage);
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    loadMessage(data) {
        try {document.querySelector(".null").parentNode.removeChild(document.querySelector(".null"))}catch{}
        let element = document.querySelector(".messages");
        element.innerHTML += `
        <div class="message">
            <img src="/src/users-previews/${data.avatar}" alt="" onclick="location.href='../../../../users/${data.id}'">
            <div class="text">
                <div class="title">
                    <div class="name">${data.name}</div>
                    <div class="public-time">${data.public_time}</div>
                </div>
                <div class="main-text">${data.text}</div>
            </div>
        </div>`;
    }

    sendMessage() {
        let text = document.querySelector(`.message-area`).value;
        if (!text) return;
        document.querySelector(`.message-area`).value = "";

        let today = new Date;
        let day = today.getDay();
        if (day < 10) day = `0${today.getDay()}`;
        let month = today.getMonth() + 1;
        if (month < 10) month = `0${today.getMonth() + 1}`;
        let date = `${day}.${month}.${today.getFullYear()}`;

        this.socket.emit("message-send", {
            url:      this.articlUrl, 
            text:     text,

            id:       this.getCookie("id"),
            login:    this.getCookie("login"),
            password: this.getCookie("password"),
            date:     date
        });
    }
}

const messendger = new Messendger();