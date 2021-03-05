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

// need to add get request for notes api 

// need to add post requests for api to read notes JSON and write to notes JSON

// need to research the delete functionality for bonus


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
