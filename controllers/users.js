const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/user");

//Controlador GET
const usersGet = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

//Controlador PUT
const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, google, password, ...resto } = req.body;

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //Actualizar usuarios
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json(usuario);
};

//Controlador POST
const usersPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

//Controlador DELETE
const usersDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //Cambio de estado
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  //Usuario autenticado
  const usuarioAutenticado = req.usuario;

  res.json({ usuario, usuarioAutenticado });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};
