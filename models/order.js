const { Schema, model } = require("mongoose");

//Pedidos
const OrderSchema = Schema({
  productos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: [true, "El producto es obligatorio"],
    },
  ],
  total: { type: Number, default: 0 },
  fecha: { type: Date, default: Date.now },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario es obligatorio"],
  },
});

//Excluir atributos de la response
OrderSchema.methods.toJSON = function () {
  const { __v, fecha, ...data } = this.toObject();
  data.fecha = new Date(fecha).toLocaleDateString();
  return data;
};

module.exports = model("Orden", OrderSchema);
