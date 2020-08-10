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
    let noteTitle = req.body.noteTitle;
    let noteContent = req.body.noteContent;
    let noteInfo = { title: noteTitle, text: noteContent };
    fs.readFile("app/db/db.json", "utf8", (err,data) =>{
      if (err) throw err;
      const allNotes = JSON.parse(data);
      allNotes.push(noteInfo);
      fs.writeFile("app/db/db.json", JSON.stringify(allNotes, null, 2), err =>{
        if (err) throw err;
        res.send(savedNotesFile);
        console.log("note created")
        console.log(noteTitle, noteContent);
      })
  });
  })

  app.delete("/api/notes/:id",  (req, res) => {
    const noteId = req.params.id;
    fs.readFile("app/db/db.json", "utf8", (err,data) =>{
      if (err) throw err;
      const allNotes = JSON.parse(data);
      const newNotes = allNotes.filter(note => note.id != noteId );
      fs.writeFile("app/db/db.json", JSON.stringify(newNotes, null, 2), err =>{
        if (err) throw err;
        res.send(savedNotesFile);
        console.log("note deleted")
        })
    })
  })
};



