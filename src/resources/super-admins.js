import express from 'express';

const router = express.Router();

const fs = require('fs');

const superAdmins = require('../data/super-admins.json');

router.get('/filter', (req, res) => {
    const firstName = req.query.firstName;
    const foundSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.firstName === firstName);
    console.log(firstName)
    if(foundSuperAdmins) {
        res.status(200).send({ success: true, msg: 'Super Admin found successfully', data: foundSuperAdmins });
    } else {
        res.status(404).send({ success: false });
    }
})

export default router;