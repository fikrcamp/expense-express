const express= require("express")
const app = express()
const port = 8000;

// middleware
app.use(express.json())

const expense = [
    {id:1,description:"Food",amount:35},
    {id:2,description:"internet bill",amount:25}, 
    {id:3,description:"water",amount:10}
]

 
// just get one expense with that specific id passed
app.get("/expense/:id",(req,res)=>{
    const index = expense.findIndex(expense=> expense.id == req.params.id)

    const getSpecificExp= {
          id:req.params.id ,
          description: expense[index].description ,
          amount:expense[index].amount 
    }
   
    console.log(getSpecificExp)
    res.status(200).json({Message: getSpecificExp})
    
})




// get the list of expense
app.get("/expense",(req,res)=>{
    res.status(200).json({found:expense.length, list:expense})
})



// added new item in expense list
app.post("/expense",(req,res)=>{
    // if operation that finds the last id of expense list , If list is empty the default id would be 1
    let id;
    if(id >= 0 ){
        id= expense[expense.length-1].id+1  
     }else{
      id =1;
     }

    expense.push({id:id ,description:req.body.description ,amount:req.body.amount})
    res.status(201).json({message:expense})
})


 

//deleted  the specific expense where  the id  is passed 
app.delete("/expense/:id",(req,res)=>{

    const remove = req.params.id -1
    expense.splice(remove,1)
    res.status(200).json({deletedMessage:expense})
})



// return the total amount of all expenses
app.get("/expense/:total",(req,res)=>{
    let total = 0;
    let expenseSum= 0;
    expense.forEach(element => {
        expenseSum += element.amount;
      });
    total = total +  expenseSum;
    res.status(200).json({totalExpenses:total})
    
})



// we edit the specific expense and the body should include description or amount or both
app.put("/expense/:id",(req,res)=>{
    const index = expense.findIndex(expense=> expense.id == req.params.id)

    expense.splice(index,1,{
        id: parseInt(req.params.id ),
        description:req.body.description,
        amount:req.body.amount
  })
    
    res.status(200).json({editedMessage:expense})
    
})



//listening the port 
app.listen(port,()=>{
    console.log("App running on the port 8000 ")
})



