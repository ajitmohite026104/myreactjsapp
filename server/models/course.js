const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    thumbnail: { type: String, required: false },
    videosrc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", Course);
