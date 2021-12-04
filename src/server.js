// set up express
const express = require("express");
const fs = require("fs");
const path = require("path");
// connect my routes to this file

const apiRouter = require("../routes/apiRoutes");

// create new app instance using express
const app = express();

// set up port
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define my folder with static assets
app.use(express.static(path.join(__dirname, "../public")));

// connect routes
app.use("/api", apiRouter);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// connect my express app to the port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
