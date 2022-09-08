const mongoose = require("mongoose");
const schema = mongoose.Schema;

let menuSchema = new schema({
  name: { type: String, require: true },
  icon: { type: String, require: true },
  menuUrl: { type: String, require: true },
  entryDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Menu", menuSchema, "menu");
