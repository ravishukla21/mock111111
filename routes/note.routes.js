const express = require("express");
const { NoteModel } = require("../models/note.model");
const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.json({ msg: "new note has  been added", note: req.body });
  } catch (err) {
    res.json({ error: err.messsage });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.body.userID });
    res.json(notes);
  } catch (err) {
    res.json({ error: err.messsage });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const userIDinuser = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinnote = note.userID;
    if (userIDinuser === userIDinnote) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.json({ msg: `${note.title}has been updated` });
    } else {
      res.json({ msg: "not authorized" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const userIDinuser = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinnote = note.userID;
    if (userIDinuser === userIDinnote) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.json({ msg: `${note.title}has been deleted` });
    } else {
      res.json({ msg: "not authorized" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = { noteRouter };
