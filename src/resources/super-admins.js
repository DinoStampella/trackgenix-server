import express from 'express';
import fs from'fs';
const superAdmins = require('../data/super-admins.json');
const router = express.Router();

router.post('/', (req, res) => {
    let newSuperAdmin = req.body;
    newSuperAdmin.id = (superAdmins.length + 1).toString();
    superAdmins.push(newSuperAdmin);
    fs.writeFile("./src/data/super-admins.json", JSON.stringify(superAdmins, null, 2), (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
            });
        };
        res.status(201).json({
            success: true,
            msg: "Super Admin created successfully",
            data: newSuperAdmin
        });
    });
});

export default router;