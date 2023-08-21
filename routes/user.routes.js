const express = require("express");

const { UserModel } = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        const user = new UserModel({ email, password: hash });
        await user.save();
      }
    });
    res.json({ msg: "user has been registered", user: req.body });
  } catch (err) {
    res.json({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            {
              userID: user._id,
            },
            "masai"
          );
          res.json({ msg: "logged in", token });
        }
      });
    } else {
      res.json({ msg: "user does not exist" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});
module.exports = { userRouter };
