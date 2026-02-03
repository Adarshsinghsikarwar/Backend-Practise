const mongoose = require("moongose");

function connectToDB() {
  mongoose
    .connect("mongodb://localhost:27017/Auth")
    .then((data) => {
      console.log("connected succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
