const Menu = require("../models/Menu");

module.exports = {
  getHome: async (req, res) => {
    let ssh = req.session;
    try {
      let menuData = await Menu.Menu.find({});
      res.render("home", {
        title: "Menu Tracker",
        data: menuData,
        search: "",
        loggedIn: ssh.loggedIn,
      });
    } catch (e) {
      console.error(e);
    }
  },
  getSearch: async (req, res) => {},
};
