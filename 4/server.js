const express = require("express");
const connectDB = require("./src/db/db");
const noteModel = require("./src/models/note.model");

// Server created
const app = express();

// This is a middleware help to take the data from fronted in json form
app.use(express.json());

// now we are programming the server
app.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    await noteModel.create({
      title,
      content,
    });
    res.json({
      message: "Note has been created ",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/notes/:index", async (req, res) => {
  try {
    const id = req.params.index;
    let note = await noteModel.findById(id);
    if (!note) {
      return res.json({
        message: "note data fetched failed ",
      });
    }
    res.json({
      message: "Successfully fetched",
      note,
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/notes/:index", async (req, res) => {
  try {
    const id = req.params.index;
    const { title } = req.body;
    const note = await noteModel.findById(id);
    console.log(id);
    if (!note) {
      return res.json({
        message: "updation failed",
      });
    }
    await noteModel.findOneAndUpdate({
      title,
    });
  } catch (err) {}
});
app.delete("/notes/:index", async (req, res) => {
  try {
    const id = req.params.index;
    const note = await noteModel.findById(id);
    if (!note) {
      return res.json({
        message: "deletion failed",
      });
    }
    await noteModel.findOneAndDelete({
      _id: id,
    });

    res.json({
      message: "Note deleted succesfully",
    });
  } catch (err) {
    console.log(err);
  }
});
// here we connected the backend to the database
connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
