const {Router} = require('express');
const {UserModel} = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = Router();
const mongoose = require("mongoose");
const {JWT_USER_SECRET} = require("../config.js")
const {usermiddleware} = require("../middleware/user.js")


userRouter.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const hashedpassword = await bcrypt.hash(password,5);
    try{
    await UserModel.create({
        email: email,
        password: hashedpassword,
        firstname: firstname,
        lastname: lastname
    });
    res.json({
        message:"User is signed up"
    })
    } catch(e){
    console.log(e)
    res.status(403).json({
        message:"User already exists"
    })
    }
})

userRouter.post("/login",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
    });

    if(!response){
        res.status(403).json({
            message: "No user exists in our DB"
        
        })
        return 
    } else {
    const passwordMatch = await bcrypt.compare(password,response.password)
    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_USER_SECRET);

        res.json({
            token:token,
            message: "User is logged in "
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
        return 
    }
    }
})

userRouter.post("/purchases",usermiddleware ,async (req,res)=>{
    res.json({
        message:"Purchases are displayed"
    })
})

module.exports ={ userRouter: userRouter};