const fs = require("fs");

class Config {
    constructor() {
        this.setInfo();
        this.addHeandler();
    }

    addHeandler() {
        fs.watch("config.json", (event, filename) => {
            if (!filename) return;
            this.setInfo();
        });
    }

    setInfo() {
        let fileContent = JSON.parse(fs.readFileSync("config.json"));
        let entries = Object.entries(fileContent);
        for (let item of entries) {
            this[item[0]] = item[1];
        }
    }
}

module.exports.config = new Config();