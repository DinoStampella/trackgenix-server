const express = require("express")
const projects = require('../data/projects.json');
const fs = require('fs');
const router = express.Router();
router.use(express.urlencoded({extended: false}));


router.post('/post/', (req, res) => {
    const newProject = req.body;
    projects.push(newProject);
    let errors = "";
    projects.forEach(function(proj, index){
        if(newProject.id && newProject.id == index){
           return res.send("A project with this id already exists");
        };
    });
    function checkData(data, err){errors = data ? errors : errors += err;}
    newProject.id = newProject.id ? newProject.id.toString() : projects.length.toString();
    checkData(newProject.projectName, "Project needs a name. ")
    checkData(newProject.description, "Project needs a description. ")
    checkData(newProject.startDate, "Project needs a start date. ")
    newProject.status = newProject.endDate ? newProject.status : "active";
    checkData(newProject.status, "Project needs a status. ")
    if(errors == ""){
        fs.writeFile("./src/data/projects.json", JSON.stringify(projects), (err) => {
            if (err) {
                console.log(err);
                return res.send("Could not save new project."); 
            };
            res.send(`Project saved successfully:\n ${JSON.stringify(newProject)}`);
        });
    }
    else{
        res.send(`Errors: ${errors}`);
    };  
});

router.delete("/delete/:id", (req, res) => {
    const projectId = req.params.id;
    const filteredProject = projects.filter(projects => projects.id !== projectId);
    const projectExists = projects.filter(projects => projects.id == projectId);
    if(projectExists[0]){
        fs.writeFile("./src/data/projects.json", JSON.stringify(filteredProject), (err) => {
            if (err) {
                console.log(err);
                return res.send("Could not delete project.");
            };
            res.send("Project deleted successfully:");
        });
    }
    else{
        return res.send("There isn't a project with the requested id");
    };
});

module.exports = router;