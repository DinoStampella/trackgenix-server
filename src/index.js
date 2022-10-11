// use "import" to import libraries

const express = require('express');

// use "require" to import JSON files
const admins = require('./data/admins.json');
const projects = require('./resources/projects.js');
// const projectsJson = require('./data/projects.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/projects", projects);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
