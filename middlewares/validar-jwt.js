const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  //Existe token
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  //Validar token
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Usuario autenticado
    const usuario = await Usuario.findById(uid);

    //Validar usuario
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe",
      });
    }

    //Verificar estado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario eliminado",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    //ERROR
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { validarJWT };
