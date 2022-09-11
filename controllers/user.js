const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  getLogin: async (req, res) => {
    res.render("login", { title: "login", loggedIn: false, error: null });
  },
  getSignup: async (req, res) => {
    res.render("register", { title: "register", loggedIn: false, error: null });
  },
  getLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  postLogin: async (req, res) => {},
  postSignup: async (req, res) => {},
};
