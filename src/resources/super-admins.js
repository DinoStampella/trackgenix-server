const express = require("express")
const superAdmins = require('../data/super-admins.json');
const fs = require('fs');
const router = express.Router();
router.use(express.urlencoded({extended: false}));

router.post('/post/', (req, res) => {
    let newSuperAdmin = req.body;
    newSuperAdmin.id = (superAdmins.length + 1).toString();
    superAdmins.push(newSuperAdmin);

    fs.writeFile("./src/data/super-admins.json", JSON.stringify(superAdmins, null, 2), (err) => {
        if (err) {
            console.log(err);
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

module.exports = router;