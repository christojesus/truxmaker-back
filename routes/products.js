const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");
const { productsGet, productGet } = require("../controllers/products");
const { existeProductoId } = require("../helpers/db-validators");

const router = Router();

//Ruta GET
router.get("/", productsGet);

//Ruta GET
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  productGet
);

module.exports = router;
