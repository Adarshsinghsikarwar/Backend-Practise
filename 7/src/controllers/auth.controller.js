import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (user) {
    return res.status(401).json({
      message: "not a right user",
    });
  }
  const passwordHashed = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username,
    email,
    password: passwordHashed,
  });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "user not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid password",
    });
  }
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET);
  res.cookie("token", token);
  res.status(200).json({
    message: "login successful",
  });
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "logout successful",
  });
}

export async function getMe(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    user,
  });
}
