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
  getSearch: async (req, res) => {
    let ssh = req.session;
    let q = req.body.search.searchInput;
    let menuData = null;
    let qry = { name: { $regex: "^" + q, $options: "i" } };
    try {
      if (q != null) {
        let menuResult = await Menu.find(qry);
        menuData = menuResult.data;
      } else {
        q = "search";
        let menuResult = await Menu.find({});
        menuData = menuResult.data;
      }
      res.render("home", {
        title: "Menu Tracker",
        data: menuData,
        search: q,
        loggedIn: ssh.loggedIn,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
