const express = require("express");

const app = express();

app.get("/home", (req, res) => {
  res.send("Hello from home page");
});
app.get("/about", (req, res) => {
  console.log("Hello from about page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
