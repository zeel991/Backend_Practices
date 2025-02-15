const express = require("express")

const app = express()
app.use(express.json());
const todos = [{
    title : "Gym",
    id: 1
},{
    title : "Cook",
    id: 2
}];

app.get("/",function(req,res){
    res.json(todos)

})
app.post("/",function(req,res){
    const t = req.body
    const temp = {
        title : t.title,
        id : t.id
}
    todos.push(temp)
    res.json({})
})

app.delete("/",function(req,res){
    const t = req.body
    const tempId = t.id
    const index = todos.findIndex((todo) => todo.id === tempId);

    todos.splice(index, 1);
    
res.json({})
})


app.listen(3000)