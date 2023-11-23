const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

//Clase Server
class Server {
  //Constructor
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Paths
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    this.productsPath = "/api/products";
    this.ordersPath = "/api/orders";

    this.cardPath = "/api/cards";

    //Conectar a la base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  //Método conectarDB
  async conectarDB() {
    await dbConnection();
  }

  //Método middlewares
  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio público
    this.app.use(express.static("public"));
  }

  //Método routes
  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPath, require("../routes/users"));

    this.app.use(this.productsPath, require("../routes/products"));
    this.app.use(this.ordersPath, require("../routes/orders"));

    this.app.use(this.cardPath, require("../routes/cards"));
  }

  //Método listen
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
