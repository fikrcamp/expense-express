const express = require("express");
const res = require("express/lib/response");

const app = express();

app.use(express.json())

app.listen(8000,()=>{
    console.log("hi")
})
 let Expenses = [{id:10, description:"food", amount:20},{id:18, description:"shopping", amount:40},{id:27, description:"petrol", amount:90}]

app.get("/expenses/:id",(req,res)=>{
     
    let sel = req.params.id 
    let selected = Expenses.filter((expe) => expe.id == sel )
     
    
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
    total = Number(total + Expenses[i].amount) ;
   
    }

    res.status(206).json({totalAmount:total})
})

app.delete("/expense/:id",(req,res)=>{
    
     let del = req.params.id 
    let remained = Expenses.filter((expe) => expe.id != del )
    Expenses = remained
    
    res.status(200).json({expenses:Expenses})
    
})

app.put("/expense/:id",(req,res)=>{
    let sel = req.params.id 
    let newEx= Expenses.filter((expe) => expe.id == sel )  
    let unchanged =  Expenses.filter((expe) => expe.id != sel ) 
    newEx = [{id:sel, description:req.body.description, amount:req.body.amount}] 
     Expenses =    newEx.concat(unchanged)
   
    res.status(200).json({expenses:Expenses})
    
})


