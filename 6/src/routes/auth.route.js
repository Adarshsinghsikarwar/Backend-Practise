const express = require("express");
const userModel = require("../models/user.model");

const router = express.Router();

router.use("/login", (req, res) => {
  const { name, password, email } = req.body;
  const user = userModel.create({
    name,
    password,
    email,
  });
});
