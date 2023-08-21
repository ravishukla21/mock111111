const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    name: String,
    image: String,
    specialization: String,
    experience: Number,
    location: String,
    date: String,
    slots: Number,
    fee: Number,
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("doctor", noteSchema);
module.exports = {
  NoteModel,
};
