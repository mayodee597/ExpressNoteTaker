const express = require("express");
const path = require("path");
const db = require("./app/db/db.json");
const fs = require("fs");
const http = require("http");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

function handleRequest(req, res) {

  //saving Request Data as a variable
  const requestData = "";

  //when server received data
  req.on("data", function(data) {

  // its added to the requestData
    requestData += data;
  });


// Create a fXn for handling the requests & responses coming into our server
  function handleRequest(req, res) {
    //Use the fs package to read the index.html file
  fs.readFile(_dirname + "/index.html", function(err, data) {
    if (err) throw err;
    //respond to client with HTML telling browser deleting HTML
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(data);
  });
  }

//when requests end...
  req.on("end", function() {
    //log (server-side) Request method as well as received data
    console.log("You did a", req.method, "with the data:\n", requestData);
    res.end();
  });

}
  
// Sets up the Express app to handle data parsing
app.use(express.static("app/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routes/htmlRoutes")(app);
require("./app/routes/apiRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);

});

