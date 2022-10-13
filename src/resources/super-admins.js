import express from 'express';

const router = express.Router();

const superAdmins = require('../data/super-admins.json');

router.get('/:firstName', (req, res) => {
  const { firstName } = req.params;
  const foundSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.firstName === firstName);
  if (foundSuperAdmins[0]) {
    res.status(200).json({ success: true, msg: 'Super Admin found successfully', data: foundSuperAdmins });
  } else {
    res.status(404).json({ success: false, msg: 'There is no super admin' });
  }
});

export default router;
