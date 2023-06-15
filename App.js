const express = require("express");
const app = express();
const port = 4400;
app.use(express.json());
const data = [{ id: 1, description: "Food", amount: 35 }];

// Get all tasks
app.get("/task", (req, res) => {
    res.status(200).json({ message: "Welcome to the home page", data: data });
});

// Create a new task
app.post("/task", (req, res) => {
    const id = data.length === 0 ? 1 : data[data.length - 1].id + 1;
    const newTask = {
        id: id,
        description: req.body.description,
        amount: req.body.amount
    };

    data.push(newTask);
    res.status(200).json({ message: "Task created successfully!" });
});

// Get a single task
app.get("/task/:id", (req, res) => {
    const task = data.find(task => task.id == req.params.id);
    if (task) {
        res.status(200).json({ message: "Task found", task: task });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Update a task
app.put("/task/:id", (req, res) => {
    const task = data.find(task => task.id == req.params.id);
    if (task) {
        task.description = req.body.description;
        task.amount = req.body.amount;
        res.status(200).json({ message: "Task updated successfully!" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Delete a task
app.delete('/task/:id', (req, res) => {
    const index = data.findIndex(task => task.id == req.params.id);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(200).json({ message: "Task deleted successfully!" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.listen(port, () => {
    console.log("Server is running on port 4400!");
});
