import express from 'express';
import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

function getMaxId(adminInput) {
  let maxId = 0;
  adminInput.forEach((admin) => {
    if (admin.id > maxId) {
      maxId = admin.id;
    }
  });
  return maxId + 1;
}

router.get('/', (req, res) => {
  if (admins.length) {
    res.status(200).json({
      success: true,
      msg: 'Admin found Successfully',
      data: admins,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'There is not Admins',
    });
  }
});

router.get('/:id', (req, res) => {
  const adminId = parseInt(req.params.id, 10);
  if (!adminId) {
    res.status(400).json({
      success: false,
      msg: 'The id is not valid',
    });
  }
  const adminObtained = admins.find((admin) => admin.id === adminId);
  if (!adminObtained) {
    res.status(404).json({
      success: false,
      msg: `There is not Admin with the id: ${adminId}`,
    });
  } else {
    res.status(200).json({
      success: true,
      msg: 'Admin found Successfully',
      data: adminObtained,
    });
  }
});
router.get('/:username', (req, res) => {
  const adminUsername = req.params.username;
  const adminObtained = admins.find((admin) => admin.user_name === adminUsername);
  if (!adminObtained) {
    res.status(404).json({
      success: false,
      msg: `There is not Admin with the username: ${adminUsername}`,
    });
  } else {
    res.status(200).json({
      success: true,
      msg: 'Admin found Successfully',
      data: adminObtained,
    });
  }
});
router.post('/add', (req, res) => {
  const newAdmin = req.body;
  const maxId = getMaxId(admins);
  const idJSON = { id: maxId };
  const finalAdmin = Object.assign(idJSON, newAdmin);
  admins.push(finalAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
    } else {
      res.status(201).json({
        success: true,
        msg: 'Admin created Successfully',
        data: finalAdmin,
      });
    }
  });
});

export default router;
