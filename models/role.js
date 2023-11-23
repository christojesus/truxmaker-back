const { Schema, model } = require("mongoose");

//Role
const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
