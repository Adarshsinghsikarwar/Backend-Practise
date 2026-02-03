const express = require("express");
const indexRoute = require("./routes/index.route");
const router = express.Router();

router.use((req, res, next) => {
  console.log("This is middleware between app and route");
  next();
});

router.use("/", indexRoute);
