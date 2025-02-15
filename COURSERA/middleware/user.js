const jwt = require("jsonwebtoken")
const {JWT_USER_SECRET} = require("../config.js")

function usermiddleware(req,res,next){

    const token = req.headers.token
    const decoded = jwt.verify(token , JWT_USER_SECRET)

    if(decoded){
        req.userId = decoded.id
        next()
    } else {
        res.status(403).json({
            message:"You are not signed in "
        })
    }
}

module.exports = {
    usermiddleware: usermiddleware
}