const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // console.log('post request received at /repos');
  var searchTerm = Object.keys(req.body)[0];
  console.log(searchTerm);
  var repos = github.getReposByUsername(searchTerm, (err, data)=>{
    if (err) {
      throw err;
    } else {
      db.save(data);
    }
  });

  // console.log("repos below:");
  // console.log(repos);

  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

