const expense = [{id:1,description:"Food",amount:35}]


// const expense = [{id:1,description:"Food",amount:35}]


const express = require ("express")  // import express from module 
const app = express();  // init express

app.use(express.json())

const expense = [{id:4,item:"flour", price:20},
                       {id:5,item:"rice",price:30}]

app.get("/expense", (req,res)=>{
    res.status(200).json({found:expense.length,list:expense})
})

app.post("/expense", (req,res) =>{
    // console.log(req.body)
    const id = expense[expense.length-1]? expense[expense.length].id+1:1
    expense.push({id:id,item:req.body.item,price:req,body,price})
    res.status(201).json({massege:"create list"})
} )

expense.push(Newexpense)
res.status(201).json({massege:"New expense"})


app.put("/list/edit", (req,res) =>{
    res.status(201).json({massege:"edited list"})
})

//Delete
app.delete("/expense/:id", (req,res) =>{
    const index = expense.findIndex((expense)=> expense.id == req.params.id)
    expense.splice(index,1)
    res.status(208).json({massege:"deleted expense"})
})



app.listen(2000,()=>{
    console.log("listening on port 2000")
})