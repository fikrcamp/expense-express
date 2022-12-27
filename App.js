const express = require("express");

const app = express()

app.use(express.json());

const expenses = [{id:1, description:"Food", amount: 100}, {id:2, description:"Rent", amount: 200}]

//expenses GET - retrieve/read data
app.get("/expenses", (req, res)=>{
    res.status(200).json({found:expenses.length, expenseList:expenses})
});

// expenses POST - add new data
app.post("/expenses", (req, res)=>{
    // let id = expenses.reduce((maxId, expense)=>{ return Math.max(maxId, expense.id)}, 0) + 1;
    let id = expenses[expenses.length - 1] ? expenses[expenses.length - 1].id + 1 : 1
    expenses.push({id:id, description:req.body.description, amount:req.body.amount})
    res.status(201).json({message:"a new item was added to the list"});
});

// expenses/id DELETE - delete existing data
app.delete("/expenses/:id", (req, res)=>{
    let id = req.params.id;
    const index = expenses.findIndex(i => i.id === id)
    expenses.splice(index, 1)
    res.status(200).json({message:`Deleted user with id ${id}`});
});

// expenses/id PUT - replace or update existing data
app.put("/expenses/:id", (req, res)=>{
    const id = req.params.id;
    const updatedId = expenses.findIndex(i => i.id == req.params.id)
    expenses[updatedId] = {id:id, description:req.body.description, amount:req.body.amount}
    res.status(200).json({message:'successfully updated the expense list'})
});

// expenses/total GET
app.get("/expenses/total", (req, res)=>{
    let total = 0;
    if (expenses && expenses.length > 0) {
        expenses.forEach(i => {
            total += i.amount;
        });
    }
    res.status(200).json({ total });
});

// expenses/id GET
app.get("/expenses/:id", (req, res)=>{
    const id = req.params.id
    const expense = expenses.find(i => i.id == id)
    res.status(200).json(expense)
})

// Port
app.listen(7000, ()=>{
    console.log("Port 7000")
})