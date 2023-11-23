const { Router } = require("express");
const { cardGet, cardsGet } = require("../controllers/cards");

const router = Router();

//Ruta GET
router.get("/", cardsGet);

//Ruta GET
router.get("/:numero", cardGet);

module.exports = router;
