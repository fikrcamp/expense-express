
const express = require("express")

const app = express()

app.listen(9000, () => {
    console.log("hey Iam listening port 9000")
})

app.use(express.json())

let expense = [
    { id: 150, description: "food", amount: 100 },
    { id: 70, description: "petrol", amount: 200 },
    { id: 50, description: "shopping", amount: 900 },
]

//displayin what are inside in our list 
app.get("/expense", (req, res) => {
    res.status(200).json({ Founded: expense.length, List: expense })

})

//creating and adding a new item in our list
app.post("/expense", (req, res) => {
    let id = expense[expense.length - 1] ? expense[expense.length - 1].id + 1 : 1
    expense.push({ id: id, description: req.body.description, amount: req.body.amount })
    res.status(200).json({ message: "successfully created and added new item in your list expenses" })

})

//deleting specific id or item in our list
app.delete("/expense/:id", (req, res) => {

    const deletedItem = parseInt(req.params.id)
    let newUpdate = expense.filter((e) => e.id !== deletedItem)
    expense = newUpdate
    res.status(200).json({ message: `You've successfully deleted the item has an id of ${req.params.id}` })

})

//editing specific id and an object
app.put("/expense/:id", (req, res) => {
    const edited = parseInt(req.params.id)

    //storing another new object from input body 
    let newObj = {
        id: edited,
        description: req.body.description,
        amount: req.body.amount,
    }

    //using loop to find the index of every item in my previous array [expense] and set to my updated object
    let i = expense.findIndex(o => o.id === edited);
    if (expense[i]) {
        expense[i] = newObj
    } else {
        expense.push(newObj)
    }


    res.status(200).json({ message: `You've edited the item has an id of ${edited}` })

})



//calculating total of our expense amount list
app.get("/expense/total", (req, res) => {
    let total = 0
    let sumHolder = 0
    expense.map(filter => {
        sumHolder = filter.amount
        total += sumHolder
    })

    res.status(200).json(total)
})

//displaying specific item details
app.get("/expense/:id", (req, res) => {

    let specificView = expense.filter((e) => e.id == req.params.id)
    res.status(200).json("this is the item you've searched" + specificView)
})