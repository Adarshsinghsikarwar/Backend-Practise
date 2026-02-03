let express = require("express");

const app = express(); // created a server

let notes = [];
app.use(express.json());

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.json({
    message: "the info about the note",
    notes,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
