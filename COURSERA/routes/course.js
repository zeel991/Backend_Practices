const {Router} = require('express');
const {CourseModel} = require('../db');

const courseRouter = Router();

courseRouter.get("/see-courses",async (req,res)=>{
res.json({
    message:"Courses are displayed"
})
})

courseRouter.get("/purchased-course",async (req,res)=>{
    res.json({
        message:"Purchased Courses are displayed"
    })
})

courseRouter.post("/purchase-course",async (req,res)=>{
    res.json({
        message:"Courses that can be purchased are displayed"
    })
})

module.exports ={ courseRouter: courseRouter};