const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.put('/update/:id', (req, res) => {
  const adminId = req.params.id;
  const adminToUpdate = admins.find((admin) => admin.id === adminId);
  if (!adminToUpdate) {
    res.status(404).json({
      success: false,
      msg: 'There is no Admin with this id',
    });
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
          res.status(400).json({
            success: false,
          });
        } else {
          res.status(200).json({
            success: true,
            msg: 'Admin modified successfully',
          });
        }
      },
    );
  }
});

router.delete('/delete/:id', (req, res) => {
  const adminId = req.params.id;
  const adminToDelete = admins.find((admin) => admin.id === adminId);
  const filteredAdmins = admins.filter((admin) => admin.id !== adminId);
  if (adminToDelete) {
    fs.writeFile(
      'src/data/admins.json',
      JSON.stringify(filteredAdmins, null, 2),
      (err) => {
        if (err) {
          res.status(400).json({
            success: false,
          });
        } else {
          res.status(200).json({
            success: true,
            msg: 'Admin deleted successfully',
          });
        }
      },
    );
  } else {
    res.status(404).json({
      success: false,
      msg: 'There is no Admin with this id',
    });
  }
});

module.exports = router;
