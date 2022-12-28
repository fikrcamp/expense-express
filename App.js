const express = require("express")

const app = express();

 app.use(express.json())

const expense = [{id:1,item:"Burger",description:"Food",amount:35}]

app.get("/expense", (req,res)=>{
    res.status(200).json({found:20,data:expense})
})

app.post("/expense",(req,res) =>{

    let id = expense[expense.length -1] ? expense[expense.length-1].id +1 :1
    expense.push({id:id,item:req.body.item,description:req.body.description,price:req.body.price})
    res.status(200).json({message:"create a new list item!"})
})

// remove on for specific id
app.delete("/expense/:id",(req,res)=>{
    const delid = req.params.id -1
    expense.splice(delid,1)
    res.status(200).json({message:"delete list of item"})
    

})
// soo celint total ka qiimaha expenses 
app.get("/expense/:total",(req,res)=>{
    let total = 0;
    let expenseSum= 0;
    expense.forEach(element => {
        expenseSum += element.amount;
      });
    total = total +  expenseSum;
    res.status(200).json({totalExpenses:"the total of expenses list items"})
    
})



// Ta aan ku samayn doono edit-ka
app.put("/expense/:id",(req,res)=>{
    const index = expense.findIndex(expense=> expense.id == req.params.id)

    expense.splice(index,1,{
        id: parseInt(req.params.id ),
        description:req.body.description,
        amount:req.body.amount
  })
    
    res.status(200).json({editedMessage:"edited a list item"})
    
})

//.6 /expense/id GET => just get one expense with that specific id passed
app.get("/expense/:id",(req,res)=>{
    const index = expense.findIndex(expense=> expense.id == req.params.id)

    const getSpecificExp= {
          id:req.params.id ,
          description: expense[index].description ,
          amount:expense[index].amount 
    }
   
    console.log(getSpecificExp)
    res.status(200).json({Message:"can get specific item list"})
    
})
app.listen(8000, ()=>{
    console.log("listening on port 8000")
})

