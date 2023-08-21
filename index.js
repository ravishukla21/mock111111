const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the database");
    console.log("server is running" + `${process.env.port}`);
  } catch (err) {
    console.log(err, "something went wrong");
  }
});
