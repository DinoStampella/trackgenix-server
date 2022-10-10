const express = require('express');
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
module.exports = router;
