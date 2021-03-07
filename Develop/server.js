// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// get requests
// request for index.html (home) url
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// request for notes.html (note-taking page) url
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// get request for notes api
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, file) {
        if (err) throw err;
        let JSONFile = JSON.parse(file);
        console.log(JSONFile)
        // console.log logs "[ { title: 'Test Title', text: 'Test text' } ]"
        // how to return the JSON to the api? --> probably need to use .json method
    });
})

app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, post) {
      if (err) throw err;
      let JSONFile = JSON.parse(post);
      let newJSON = {
        title: req.body.title,
        text: req.body.text,
      };
      JSONFile.push(newJSON);
      fs.writeFile("./db/db.json", JSON.stringify(JSONFile), (err) => {
        if (err) throw err;
      });
    });
  });

// need to research the delete functionality for bonus


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
