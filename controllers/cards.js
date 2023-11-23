const { request, response } = require("express");
const Tarjeta = require("../models/card");

//Controlador GET
const cardsGet = async (req = request, res = response) => {
  const tarjetas = await Tarjeta.find();
  res.json(tarjetas);
};

//Controlador GET
const cardGet = async (req = request, res = response) => {
  const { numero } = req.params;
  const { titular, fechaExpiracion, cvv } = req.body;

  try {
    const tarjeta = await Tarjeta.findOne({ numero });
    if (!tarjeta) {
      return res.status(400).json({
        msg: "Datos incorrectos - numero",
      });
    }

    if (tarjeta.titular != titular) {
      return res.status(400).json({
        msg: "Datos incorrectos - titular",
      });
    }

    if (tarjeta.fechaExpiracion != fechaExpiracion) {
      return res.status(400).json({
        msg: "Datos incorrectos - fecha",
      });
    }

    if (tarjeta.cvv != cvv) {
      return res.status(400).json({
        msg: "Datos incorrectos - cvv",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
  res.json({ msg: "Pago realizado" });
};

module.exports = {
  cardGet,
  cardsGet,
};
