const express = require("express");
const User = require("../models/User");
const router = express.Router();
const CryptoJS = require("crypto-js");


// register
router.post("/register", async (req, res) => {
  const newUser = new User({
    fullName:req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    isAdmin:req.body.isAdmin,
    password:req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    console.log(user);

    if (!user) {
      return res.status(401).json("User is not found");
    }
    // !user && res.status(401).send("User is not found");
    const hasPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hasPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Password is wrong");
    }


    const { password, ...others } = user._doc;
    res.status(200).json({ ...others});

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;