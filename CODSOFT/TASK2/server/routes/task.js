const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user")
const { authenticatenToken } = require("./auth");
//create task
router.post("/create-task", authenticatenToken, async(req, res)=>{
    try {
        const {title, desc, deadline} = req.body;
        const {id} = req.headers;
        const newTask = new Task({title: title, desc: desc, deadline:deadline});
        const saveTask = await newTask.save();          //Saving the new task data.
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push:{task:taskId._id}});
        res.status(200).json({message: "Task Created"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
});

//Get all the task
router.get("/get-all-task", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({path :"task", options: {sort: {createdAt: -1}}, });
        res.status(200).json({data: userData});

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})

//delete task
router.delete("/delete-task/:id", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, {$pull:{task: id}});
        
        res.status(200).json({message: "Task deleted sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})

//update task 
router.put("/update-task/:id", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.params;
        const {title, desc, deadline} = req.body;
        await Task.findByIdAndUpdate(id, {title: title, desc: desc, deadline: deadline})
        res.status(200).json({message: "Task updated sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})
//update-important-task
router.put("/update-important-task/:id", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id, {important: !ImpTask})
        res.status(200).json({message: "Task updated sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})
//update-complete-task
router.put("/update-complete-task/:id", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const completeTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, {complete: !completeTask})
        res.status(200).json({message: "Task updated sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})

//get-important-task
router.get("/get-imp-task", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path :"task", 
            options: {sort: {createdAt: -1}},
            match:{important:true} 
        });
        const ImpTaskData = Data.task;
        res.status(200).json({data: ImpTaskData});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})

//get-complete-task
router.get("/get-complete-task", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path :"task", 
            options: {sort: {createdAt: -1}},
            match:{complete:true},
        });
        const CompTaskData = Data.task;
        res.status(200).json({data: CompTaskData});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})

//get-pending-task
router.get("/get-pending-task", authenticatenToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const Data = await User.findById(id).populate({
            path :"task", 
            options: {sort: {createdAt: -1}},
            match:{complete: false},
        });
        const CompTaskData = Data.task;
        res.status(200).json({data: CompTaskData});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error." });
    }
})

module.exports = router;