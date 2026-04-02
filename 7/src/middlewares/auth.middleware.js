import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Server error ",
    });
  }
}
