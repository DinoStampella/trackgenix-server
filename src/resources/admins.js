const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(admins);
});

router.get('/get/:id', (req, res) => {
  const adminId = req.params.id;
  const adminObtained = admins.find((admin) => admin.id === adminId);
  if (adminObtained) {
    res.send(adminObtained);
  } else {
    res.send('Admin not found');
  }
});
router.get('/getByUsername/:username', (req, res) => {
  const adminUsername = req.params.username;
  const adminObtained = admins.find((admin) => admin.user_name === adminUsername);
  if (adminObtained) {
    res.send(adminObtained);
  } else {
    res.send('Username of admin not found');
  }
});
router.post('/add', (req, res) => {
  const newAdmin = req.body;
  // const maxId = admins.find(admin => Math.max(admin.id))
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send("Couldn't add the admin");
    } else {
      res.send('Admin created');
    }
  });
});
module.exports = router;
