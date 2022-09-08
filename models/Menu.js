const { SchemaType, default: mongoose } = require("mongoose");

let menuSchema = new SchemaType({
  name: { type: String, require: true },
  icon: { type: String, require: true },
  menuUrl: { type: String, require: true },
  entryDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Menu", menuSchema, "menu");
