// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// add npm nanoid to create unique ID
const nano = require('nanoid')

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;


// middleware
// url encoding parses request
app.use(express.urlencoded({ extended: true }));
// parses requests with JSON
app.use(express.json());
// used to indicate where your assets are that need to be served by the server
app.use(express.static("public"));
console.log(__dirname);
// get requests
// request for index.html (home) url
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// request for notes.html (note-taking page) url
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// get request for notes api
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, file) {
        if (err) throw err;
        let JSONFile = JSON.parse(file);
        console.log(JSONFile)
        // console.log logs "[ { title: 'Test Title', text: 'Test text' } ]"
        return res.json(JSONFile);
    });
})

app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, post) {
      if (err) throw err;
      let JSONFile = JSON.parse(post);
      let newJSON = {
        title: req.body.title,
        text: req.body.text,
        // add id with nanoid
        id: nano.nanoid(10)
      };
      JSONFile.push(newJSON);
      fs.writeFile("./db/db.json", JSON.stringify(JSONFile, null, 2), (err) => {
        if (err) throw err;
        res.send("200");
      });
    });
  });

// need to research the delete functionality for bonus

// Starts the server

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
