const { request, response } = require("express");
const Orden = require("../models/order");

//Controlador GET
const ordersGet = async (req = request, res = response) => {
  const ordenes = await Orden.find()
    .populate("usuario", "nombre")
    .populate("productos", "nombre");
  res.json(ordenes);
};

//Controlador GET
const orderGet = async (req = request, res = response) => {
  const { id } = req.params;
  const orden = await Orden.findById(id)
    .populate("usuario", "nombre")
    .populate("productos", "nombre");
  res.json(orden);
};

//Controlador POST
const ordersPost = async (req = request, res = response) => {
  const { productos, usuario, ...body } = req.body;

  //Validar datos
  const data = {
    ...body,
    productos,
    usuario,
  };

  //Crear categoría
  const orden = new Orden(data);

  //Guardar DB
  await orden.save();

  res.status(201).json(orden);
};

module.exports = {
  ordersGet,
  orderGet,
  ordersPost,
};
