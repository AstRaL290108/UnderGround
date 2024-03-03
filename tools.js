const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


const { config } = require("./modules/config-reader.js");
const databaseClass = require("./modules/database-manager.js");
const database = new databaseClass(
    config.db_host,
    config.db_user,
    config.db_database,
    config.db_password 
);

module.exports = {
    express: express,
    app: app,
    server: server,

    config: config,
    database: database,
    io: io
}