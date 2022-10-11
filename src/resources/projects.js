const express = require("express")
const projects = require('../data/projects.json');
const fs = require('fs');
const router = express.Router();
router.use(express.urlencoded({extended: false}));

router.post('/post/', (req, res) => {
    let errors = "";
    let newProject = req.body;
    newProject.id = (projects.length + 1).toString();
    projects.push(newProject);
    function checkData(data, err){
        console.log(newProject[data]);
        newProject[data] ? errors : (errors += err);
    };
    checkData("projectName", "Project needs a name. ")
    checkData("description", "Project needs a description. ")
    checkData("startDate", "Project needs a start date. ")
    newProject.status = newProject.endDate ? newProject.status : "active";
    checkData("status", "Project needs a status. ")
    if(errors == ""){
        fs.writeFile("./src/data/projects.json", JSON.stringify(projects, null, 2), (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: false,
                }); 
            };
            res.status(201).json({
                success: true,
                msg: "Project created successfully",
                data: newProject
            });
        });
    }else{
        res.status(400).json({
            success: false,
            msg: errors
        });
    };  
});

router.delete("/delete/:id", (req, res) => {
    const projectId = req.params.id;
    const filteredProject = projects.filter(projects => projects.id !== projectId);
    const projectExists = projects.find(project => project.id == projectId);
    if(projectExists){
        fs.writeFile("./src/data/projects.json", JSON.stringify(filteredProject, null, 2), (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                });
            };
            res.status(200).json({
                succes: true,
                msg: `Project deleted successfully`
            });
        });
    }
    else{
        res.status(404).json({
            success: false,
            msg: `There is no project with this id (${projectId})`
        });
    };
});

module.exports = router;
