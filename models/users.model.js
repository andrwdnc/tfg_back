const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
    enum: ["User", "Admin"],
  },
  event: {
    type: Object,
  }
});

const User = mongoose.model("Usuarios", usersSchema);
module.exports = User;
