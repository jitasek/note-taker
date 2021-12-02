const { dirname } = require("path");
const path = require("path");

// register my paths
// when these paths are hit, their controller functions get triggered that render the corresponding pages

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
