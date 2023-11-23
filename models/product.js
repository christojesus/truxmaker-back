const { Schema, model } = require("mongoose");

//Producto
const ProductSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  imagen: { type: String },
});

//Excluir atributos de la response
ProductSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", ProductSchema);
