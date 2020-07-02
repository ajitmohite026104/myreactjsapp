const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppUser = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    imageUrl: { type: String, required: false },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appUser", AppUser);
