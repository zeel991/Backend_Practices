const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String,
})

const Admin = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
})

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    adminId: ObjectId,
})

const Purchased = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
})

const UserModel = mongoose.model('users', User);
const AdminModel = mongoose.model('admins', Admin);
const CourseModel = mongoose.model('courses', Course);
const PurchasedModel = mongoose.model('purchased', Purchased);

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchasedModel,
}