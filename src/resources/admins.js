const express = require('express');

const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((admin) => admin.id !== adminId);
  fs.writeFile(
    'src/data/admins.json',
    JSON.stringify(filteredAdmins),
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
