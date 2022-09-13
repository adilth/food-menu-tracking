const Menu = require("../models/Menu");

module.exports = {
  getMenu: async (req, res) => {
    res.render('menu',{title: 'Menu Page'})
  },
  getEditMenu: async (req, res) => {},
  DeleteMenu: async (req, res) => {},
  postSaveMenu: async (req, res) => {},
  postNewMenu: async (req, res) => {},
};
