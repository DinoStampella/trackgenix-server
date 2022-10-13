import express from 'express';
import fs from 'fs';

const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/:firstName', (req, res) => {
  const { firstName } = req.params;
  const foundSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.firstName === firstName);
  if (foundSuperAdmins.length > 0) {
    res.status(200).json({ success: true, msg: 'Super Admin found successfully', data: foundSuperAdmins });
  } else {
    res.status(404).json({ success: false, msg: 'There is no super admin' });
  }
});

router.post('/', (req, res) => {
  const newSuperAdmin = req.body;
  newSuperAdmin.id = (superAdmins.length + 1).toString();
  superAdmins.push(newSuperAdmin);
  fs.writeFile('./src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
      return;
    }
    res.status(201).json({
      success: true,
      msg: 'Super Admin created successfully',
      data: newSuperAdmin,
    });
  });
});

export default router;
