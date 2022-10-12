import express from 'express';

import superAdmins from'./resources/super-admins.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/superAdmin', superAdmins);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
