const apiRouter = require("express").Router();
const path = require("path");
const fs = require("fs");

// uuid for unique id
const { v4: uuidv4 } = require("uuid");
const { request } = require("http");

// API GET request
apiRouter.get("/notes", (req, res) => {
  // Read db.json file
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );

  // Send response data of the GET request
  res.json(data);
});

// API POST request
apiRouter.post("/notes", (req, res) => {
  // new note (request's body)
  const newNote = req.body;

  // stringify new note
  console.log(JSON.stringify(newNote));

  // assign unique id to new note
  newNote.id = uuidv4();

  // read data from db.json
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );
  // Push new note in db.json:
  // using .unshift() instaed of .push() here.
  // Whilst the push method adds the new note to the end of the array,
  // unshift will add it to the beginning - this will mean that the newest
  // note will always display at the top of the list in the UI

  data.unshift(newNote);
  // Write note data to db.json
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(data));
  console.info("Successfully added new note to db.json!");

  // send res
  res.json(data);
});

// API DELETE Request
apiRouter.delete("/notes/:id", (req, res) => {
  // id to delete
  let noteId = req.params.id.toString();
  //console.log(`Delete: ${noteId}`);

  // read data from db.json
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );
  // filter out notes (data) that will not be deleted

  const newData = data.filter((note) => note.id.toString() !== noteId);
  // write new data to db.json
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(newData)
  );

  console.info("Successfully deleted note of id ${noteId}");
  // send response
  res.json(newData);
});

module.exports = apiRouter;
