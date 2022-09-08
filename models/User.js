const mongoose = require("mongoose");
const schema = mongoose.schema;

let usersSchema = new schema({
  email: { type: String, require: true },
  pwd: { type: String, require: true },
  entryDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", usersSchema, "user");
