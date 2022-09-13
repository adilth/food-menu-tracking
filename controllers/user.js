const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  getLogin: (req, res) => {
    res.render("login", { title: "login", loggedIn: false, error: null });
  },
  getSignup: (req, res) => {
    res.render("register", { title: "register", loggedIn: false, error: null });
  },
  getLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  postLogin: async (req, res) => {
    let email = req.body.emailInput;
    let password = req.body.passwordInput;
    let loginSucc = false;
    let ssh = req.session;
    let qry = { email: email };
    if (email !== "" && password !== "") {
      // find account using email
      let usersResult = await users.findOne(qry).then(async (data) => {
        if (data) {
          // check if password matches
          let passResult = await bcrypt
            .compare(pass, data.pwd)
            .then((isMatch) => {
              if (isMatch) {
                // ok - set sessions
                ssh.loggedIn = true;
                loginSucc = true;
              }
            });
        }
      });
    }
    if (loginSuccess === true) {
      res.redirect("/");
    } else {
      res.render("login", {
        title: "Login",
        loggedIn: false,
        error: "Invalid Login!",
      });
    }
  },
  postSignup: async (req, res) => {
    let email = req.body.emailInput;
    let pass = req.body.pwdInput;

    if (email != "" && pass != "") {
      let users = schemas.users;
      let qry = { email: email };

      let userSearch = await users.findOne(qry).then(async (data) => {
        if (!data) {
          // password encryption
          let saltRounds = 10;
          let passSalt = await bcrypt.genSalt(saltRounds, async (err, salt) => {
            let passHash = await bcrypt.hash(pass, salt, async (err, hash) => {
              let acct = { email: email, pwd: hash, level: "admin" };
              let newUser = new schemas.users(acct);
              let saveUser = await newUser.save();
            });
          });
        }
      });

      res.render("login", {
        title: "Login",
        loggedIn: false,
        error: "Please login with your new account",
      });
    } else {
      res.render("new-acct", {
        title: "New Account",
        loggedIn: false,
        error: "All fields are required. Please check and try again.",
      });
    }
  },
};
