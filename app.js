require("dotenv").config();
const Server = require("./models/server");

//Objeto Server
const server = new Server();
server.listen();
