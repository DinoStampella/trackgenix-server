import express from 'express';
import fs from 'fs';
const tasks = require('../data/tasks.json');
const router = express.Router();

router.put('/', (req, res) =>{
    const newTask = req.body;
    let taskExists = tasks.find(task => task.id == newTask.id);
    let allTasks = tasks;
    allTasks.forEach((task, index) =>{
        if(task.id == newTask.id){
            return allTasks[index] = newTask;
        };
    });
    if(!taskExists){
        return res.status(404).json({
            success: false,
            msg: `There is no task with this id (${newTask.id})`
        });
    };
    if(!newTask.taskName){
        return res.status(400).json({
            success: false,
            msg: "Task must have a name. "
        });
    };
    fs.writeFile('./src/data/tasks.json', JSON.stringify(allTasks, null, 2), (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
            });
        };
        res.status(200).json({
            success: true,
            msg: `Task ${newTask.id} modified successfully`,
            data: newTask
        });
    });
});

export default router;