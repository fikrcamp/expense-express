const express = require("express");
const res = require("express/lib/response");

const app = express();

app.use(express.json())

app.listen(8000,()=>{
    console.log("hi")
})
 const Expenses = [{id:1, description:"food", amount:20},{id:2, description:"shopping", amount:40},]

app.get("/expenses/:id",(req,res)=>{
     
    let index = req.params.id - 1
    
    let selected = req.params.id == Expenses[index].id ? [{id:Expenses[index].id , description:Expenses[index].description, amount:Expenses[index].amount}] : []
    
    
   
    res.status(200).json({expenses:selected})
})

app.post("/expenses",(req,res)=>{

    let id = Expenses[Expenses.length - 1] ? Expenses[Expenses.length - 1].id + 1 : 1
    Expenses.push({id:id, description:req.body.description, amount:req.body.amount})
    res.status(201).json({expenses:Expenses})
   
})

app.get("/expenses",(req,res)=>{
    res.status(200).json({expenses:Expenses})
})

app.get("/expense/:total",(req,res)=>{

    let total = 0;
    for (let i = 0; i < Expenses.length; i++) {
    total = total + Expenses[i].amount ;
   
    }

    res.status(206).json({totalAmount:total})
})

app.delete("/expense/:id",(req,res)=>{
    let del = req.params.id -1
  Expenses.splice(del,1)
      
   
    res.status(200).json({expenses:Expenses})
    
})

app.put("/expense/:id",(req,res)=>{
   let index = req.params.id - 1
         let newEx = req.params.id == Expenses[index].id && ((req.body.description != Expenses[index].description )|| (req.body.amount != Expenses[index].amount )) ? [{id:Expenses[index].id, description:req.body.description, amount:req.body.amount}] : [{id:Expenses[index].id, description:Expenses[index].description, amount:Expenses[index].amount}]
          console.log(newEx)
   
    res.status(200).json({expenses:newEx})
    
})


