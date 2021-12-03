// set up express
const express = require("express");
const fs = require("fs");
const path = require("path");
// routes
const apiRouter = require("../routes/apiRoutes");
const htmlRouter = require("../routes/htmlRoutes");

// create new app instance using express
const app = express();

// set up port
const PORT = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define my folder with static assets
app.use(express.static(path.join(__dirname, "../public")));

// connect my express app to the port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
