const express = require('express');
const jwt = require('jsonwebtoken');
const {UserModel,TodoModel} = require('./db');
const mongoose = require('mongoose');

const JWT_SECRET = "geelipuchi"

mongoose.connect("")
const app = express();

app.use(express.json());

app.post("/signup", async function (req, res){
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "You have inserted in the database"
    })
})

app.post("/signin", async function (req, res){
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET)

        res.json({
            token : token
        })
    } else {
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
})

app.post("/todos",auth , async function (req, res){
    const user = req.userId
    const title = req.body.title

    await TodoModel.create({
        title : title,
        done : false,
        userId : user,
    })
    res.json({
        userId: user,
        title: title
    })
})

app.get("/todos", auth, async (req, res) => {
    const todos = await TodoModel.find({ userId: req.userId });
    res.json(todos);
});

function auth(req , res , next){
    const token = req.headers.token

    const decoded = jwt.verify(token , JWT_SECRET)

    if(decoded){
        req.userId = decoded.id
        console.log(req.userId)
        next()
    } else {
        res.status(403).json({
            message:"incorrect Cred"
        })
    }
}
app.listen("3000")