const apiRouter = require("express").Router();
const path = require("path");
const fs = require("fs");

// uuid for unique id
const { v4: uuidv4 } = require("uuid");
const { request } = require("http");

// API GET request
apiRouter.get("/notes", (req, res) => {
  // Read db.json file
  let data = JSON.parse(
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
  let data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );
  // Push new note in db.json
  data.push(newNote);
  // Write note data to db.json
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(data));
  console.log("Successfully added new note to db.json!");

  // send res
  res.json(data);
});

// API DELETE Request
apiRouter.delete("/notes/:id", (req, res) => {
  // id to delete
  let noteId = req.params.id.toString();
  //console.log(`Delete: ${noteId}`);

  // read data from db.json
  let data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );
  // filter out notes (data) that will not be deleted

  const newData = data.filter((note) => note.id.toString() !== noteId);
  // write new data to db.json
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(newData)
  );

  console.log("Successfully deleted note of id ${noteId}");
  // send response
  res.json(newData);
});

module.exports = apiRouter;
