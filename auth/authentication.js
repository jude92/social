const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRETE_KEY = "what is your date of birth";

router.post("/signUp", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const newuser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      userName: req.body.userName,
    });
    const createdUser = await newuser.save();
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("user does not exist");
    }
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) {
      res.status(404).json(" invalid password", { user: user });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRETE_KEY, {
      expiresIn: "2hr",
    });
    res
      .status(200)
      .json({ message: "logged in successfully", user: user, token });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
