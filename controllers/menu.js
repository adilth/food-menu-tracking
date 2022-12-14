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

      let qry = { _id: id };

      let itemResult = await Menu.find(qry).then((itemData) => {
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
  DeleteMenu: async (req, res) => {
    let ssh = req.session;

    if (!ssh.loggedIn) {
      res.redirect("/login");
    } else {
      let menuId = req.params.id;
      let qry = { _id: menuId };
      await Menu.deleteOne(qry);
      res.redirect("/");
    }
  },
  postSaveMenu: async (req, res) => {
    let ssh = req.session;

    if (!ssh.loggedIn) {
      res.redirect("/login");
    } else {
      console.log(req.body);
      let menuId = req.body.menuId;
      let menuName = req.body.menuName;
      let menuIcon = req.body.menuIcon;
      let menuUrl = req.body.menuUrl;

      let qry = { _id: menuId };

      let saveData = {
        $set: {
          name: menuName,
          icon: menuIcon,
          menuUrl: menuUrl,
        },
      };

      await Menu.updateOne(qry, saveData);

      res.redirect("/");
    }
  },
  postNewMenu: async (req, res) => {
    let ssh = req.session;

    if (!ssh.loggedIn) {
      res.redirect("/login");
    } else {
      console.log(req.body);
      console.log("working menu");
      let menuName = req.body.menuName;
      let menuIcon = req.body.menuIcon;
      let menuUrl = req.body.menuUrl;
      //let userId = req.user.id

      let qry = { name: menuName };

      let searchResults = await Menu.findOne(qry).then(async (userData) => {
        if (!userData) {
          // ok to add menu
          let newMenu = new schemas.menu({
            name: menuName,
            icon: menuIcon,
            menuUrl: menuUrl,
          });

          await newMenu.save();
        }
      });

      res.redirect("/");
    }
  },
};
