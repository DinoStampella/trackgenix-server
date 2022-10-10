const express = require("express")
const projectsJson = require('../data/projects.json');
const fs = require('fs');
const router = express.Router();

router.post('/post/', (req, res) => {
    const newProject = req.body;
    console.log(newProject, projectsJson.length);
    projectsJson.push(newProject);
    let errors = "";
    projectsJson.forEach(function(proj, index){
        if(newProject.id && newProject.id == index){
            errors += "A project with this id already exists";
            console.log("this executed " + newProject.id, index);
        };
    });
    function checkData(data, err){errors = data ? errors : errors += err;}
    newProject.id = newProject.id ? newProject.id.toString() : projectsJson.length.toString();
    checkData(newProject.projectName, "Project needs a name. ")
    checkData(newProject.description, "Project needs a description. ")
    checkData(newProject.startDate, "Project needs a startDate. ")
    newProject.status = newProject.endDate ? newProject.status : "active";
    checkData(newProject.status, "Project needs a status. ")
    console.log(errors);
    if(errors == ""){
        fs.writeFile("./src/data/projects.json", JSON.stringify(projectsJson), (err) => {
            if (err) {
                console.log("Could not save new project.");
                return console.log(err);
            };
            res.send(`Project saved successfully:\n ${JSON.stringify(newProject)}`);
        });
    }
    else{
        res.send(errors);
    };  
});

router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
})

module.exports = router;