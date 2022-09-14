const Menu = require("../models/Menu");

module.exports = {
  getMenu: async (req, res) => {
    res.render("menu", { title: "Menu Page" });
  },
  getEditMenu: async (req, res) => {
    let ssh = req.session;

    if (!ssh.loggedIn) {
      res.render("menu", {
        title: "Edit",
        loggedIn: false,
        error: "Invalid Request",
      });
    } else {
      let id = req.params.id;
      let err = "";

      let menu = schemas.menu;
      let qry = { _id: id };

      let itemResult = await menu.find(qry).then((itemData) => {
        if (itemData == null) {
          err = "Invalid ID";
        }

        res.render("menu", {
          title: "Edit Menu",
          item: itemData,
          loggedIn: ssh.loggedIn,
          error: err,
        });
      });
    }
  },
  DeleteMenu: async (req, res) => {},
  postSaveMenu: async (req, res) => {},
  postNewMenu: async (req, res) => {},
};
