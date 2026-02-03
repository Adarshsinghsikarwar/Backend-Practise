const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.use("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await userModel.create({
      name,
      password,
      email,
    });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.json({
      message: "user registered succussfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
});
router.use("/login", async (req, res) => {
  try {
    const { name } = req.body;
    const User = await userModel.findOne(name);
    if (!User) {
      return res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "User login successgully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.use("/user", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({
        message: "unauthorized access ,token is reqiured",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decoded.id,
    });
    res.json({
      message: "user data fetched succesfully",
    });
  } catch (error) {
    console.log(error);
  }
});
