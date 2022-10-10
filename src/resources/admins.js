const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.put('/update/:id', (req, res) => {
  const adminId = req.params.id;
  const adminToUpdate = admins.find((admin) => admin.id === adminId);
  if (!adminToUpdate) {
    res.send('Admin not found');
  } else {
    if (req.body.first_name) {
      adminToUpdate.first_name = req.body.first_name;
    }
    if (req.body.last_name) {
      adminToUpdate.last_name = req.body.last_name;
    }
    if (req.body.email) {
      adminToUpdate.email = req.body.email;
    }
    if (req.body.password) {
      adminToUpdate.password = req.body.password;
    }
    if (req.body.user_name) {
      adminToUpdate.user_name = req.body.user_name;
    }
    fs.writeFile(
      'src/data/admins.json',
      JSON.stringify(admins, null, 2),
      (err) => {
        if (err) {
          res.send('Cannot update Admin');
        } else {
          res.send('Admin updated');
        }
      },
    );
  }
});

router.delete('/delete/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((admin) => admin.id !== adminId);
  fs.writeFile(
    'src/data/admins.json',
    JSON.stringify(filteredAdmins, null, 2),
    (err) => {
      if (err) {
        res.send('Cannot delete Admin');
      } else {
        res.send('Admin deleted');
      }
    },
  );
});

module.exports = router;
