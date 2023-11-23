const { Schema, model } = require("mongoose");

//Tarjeta
const CardSchema = Schema({
  numero: {
    type: String,
    required: true,
  },
  titular: {
    type: String,
    required: true,
  },
  fechaExpiracion: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

//Excluir atributos de la response
CardSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Tarjeta", CardSchema);
