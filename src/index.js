// set up express
const express = require("express");

// create new app instance using express
const app = express();

// set up port
const PORT = 3000;

// define my folder with static assets
app.use(express.static(path.join(__dirname, "../public")));

// connect my express app to the port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
