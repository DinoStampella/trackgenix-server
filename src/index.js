import express from 'express';

import projects from './resources/projects.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/projects", projects);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
