const application = require("./application/__init__.js");
const { app, express, server, config } = require("./tools.js");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));


server.listen(config.port, () => {
	console.log(`Сервер запущен по адресу - http://localhost:${config.port}`);
});