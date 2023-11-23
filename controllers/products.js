const { request, response } = require("express");
const Producto = require("../models/product");

//Controlador GET
const productsGet = async (req = request, res = response) => {
  const productos = await Producto.find();
  res.json(productos);
};

//Controlador GET
const productGet = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  res.json(producto);
};

module.exports = {
  productsGet,
  productGet,
};
