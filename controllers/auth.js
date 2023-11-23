const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/user");
const { generarJWT } = require("../helpers/gen-jwt");

//Controlador login
const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos - correo",
      });
    }

    //Verificar estado del usuario
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos - estado",
      });
    }

    //Verificar la contraseña
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos - password",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    //ERROR
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
