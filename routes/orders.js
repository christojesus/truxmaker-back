const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");
const { ordersGet, orderGet, ordersPost } = require("../controllers/orders");
const {
  existeOrdenId,
  existeUsuarioId,
  existeProductoId,
} = require("../helpers/db-validators");

const router = Router();

//Ruta GET
router.get("/", ordersGet);

//Ruta GET
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeOrdenId),
    validarCampos,
  ],
  orderGet
);

//Ruta POST
router.post(
  "/",
  [
    check("usuario", "No es un id de Mongo válido").isMongoId(),
    check("usuario").custom(existeUsuarioId),
    check("productos", "No es un id de Mongo válido").isMongoId(),
    check("productos").custom(existeProductoId),
    validarCampos,
  ],
  ordersPost
);

module.exports = router;
