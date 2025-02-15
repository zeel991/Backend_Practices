const {Router } = require('express');
const {AdminModel, CourseModel} = require('../db');
const {JWT_ADMIN_SECRET} = require("../config.js")
const bcrypt = require('bcrypt');
const adminRouter = Router();
const {adminmiddleware} = require("../middleware/admin.js")

adminRouter.post("/signup",async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    const hashedpassword = bcrypt.hash(password,5)
    try{
        AdminModel.create({
            email : email,
            password: hashedpassword,
            lastname : lastname,
            firstname: firstname
        })
        res.json({
            message:"Admin is signed up"
        })
    } catch(e){
        console.log(e)
        res.status(403).json({
            message: "Account with this email already exists"
        })
    }
})

adminRouter.post("/login",async (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const response = await AdminModel.findOne({
        email: email
    })

    if(!response){
        res.status(403).json({
            message:"Invalid creds"
        })
    } else {
        const passwordMatch = await bcrypt.compare(password,response.password)

        if(!passwordMatch){
            res.status(403).json({
                message: "Error"
            })
        } else {
            const token = jwt.sign({
                    id: response._id,
                }, JWT_ADMIN_SECRET);
            res.json({
                token :token
            })
        }
    }
    res.json({
        message:"Admin is logged in"
    })
})

adminRouter.post("create-course",adminmiddleware, async (req,res)=>{
    const adminId = req.userId

    const {title , description , price} = req.body
    const course = await CourseModel.create({
        title,
        description,
        price,
        adminId
    })

    res.json({
        message:"Course is created",
        courseID: course._id
    })
})

adminRouter.put("/update-course",adminmiddleware, async (req,res)=>{

    const adminId = req.userId

    const {title , description , price , courseID} = req.body

    const course = await CourseModel.updateOne({
        _id: courseID,
        creatorId: adminId
    }, {
        title: title,
        description :description,
        price: price
    }
)
    res.json({
        message:"Course is updated"
    })
})

adminRouter.delete("/delete-course",adminmiddleware, async (req,res)=>{
    res.json({
        message:"Course is deleted"
    })
})
adminRouter.get("/see-courses",adminmiddleware, async (req,res)=>{
    const adminId = req.userId

    const courses = await CourseModel.find({
        creatorId: adminId
    })

    res.json({
        message:"Courses are displayed",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
};