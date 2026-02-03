const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/practise1")
    .then(() => console.log("Successfully conneted"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
