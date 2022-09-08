const express = require("express");
const router = express.Router();
//add controller
const menuController = require("../controllers/menu");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", menuController.getMenu);
router.get("/:id", menuController.getEditMenu);
router.get("/delete/:id", menuController.deleteMenu);
router.post("/save", menuController.postSaveMenu);
router.post("/new", menuController.postNewMenu);
module.exports = router;
