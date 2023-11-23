const { request, response } = require("express");

//Validar ADMIN
const esAdminRole = (req = request, res = response, next) => {
  //Validar token
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar primero el token",
    });
  }

  const { rol, nombre } = req.usuario;

  //Verificar rol
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }
  next();
};

//Validar rol
const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    //Validar token
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar primero el token",
      });
    }

    //Verificar rol
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = { esAdminRole, tieneRole };
