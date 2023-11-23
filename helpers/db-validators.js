const Role = require("../models/role");
const Usuario = require("../models/user");
const Producto = require("../models/product");
const Orden = require("../models/order");

//Verificar rol válido
const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

//Verificar si el correo existe
const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

//Verificar si el usuario existe
const existeUsuarioId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

//Verificar si el producto existe
const existeProductoId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

//Verificar si la orden existe
const existeOrdenId = async (id) => {
  const existeOrden = await Orden.findById(id);
  if (!existeOrden) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioId,
  existeProductoId,
  existeOrdenId,
};
