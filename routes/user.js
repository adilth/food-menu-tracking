const express = require("express");
const router = express.Router();
//add controller
const userController = require("../controllers/user");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", userController.getLogin);
router.get("/signup", userController.getSignup);
router.get("/logout", userController.getLogout);
router.post("/", userController.postLogin);
router.post("/signup", userController.postSignup);
module.exports = router;
