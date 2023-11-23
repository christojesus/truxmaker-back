const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioId,
} = require("../helpers/db-validators");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/users");
const router = Router();

//Ruta GET
router.get("/", usersGet);

//Ruta PUT
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usersPut
);

//Ruta POST
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usersPost
);

//Ruta DELETE
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos,
  ],
  usersDelete
);

module.exports = router;
