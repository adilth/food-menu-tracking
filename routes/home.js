const express = require("express");
const router = express.Router();
//add controller
const homeController = require("../controllers/home");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getHome);
router.post("/q", homeController.getSearch);
module.exports = router;
