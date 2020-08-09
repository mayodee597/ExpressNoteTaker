var path = require("path");
var fs = require("fs");
var savedNotesFile = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    res.json(savedNotesFile);
  });

  app.post("/api/notes", (req, res) => {
    // get info from new note -- in the req.body
    console.log("body is", req.body);
    const noteTitle = req.body.noteTitle;
    const noteContent = req.body.noteContent;
    const noteInfo = { title: noteTitle, text: noteContent };
  });
};
