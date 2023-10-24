const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyparse = require('body-parser')
const local = require('passport-local')
const User = require("../model/user")
const app = express()
mongoose.connect("mongodb://localhost:27017")

app.set("view engine", "ejs")
app.use(bodyparse.urlencoded({extended:true}))

app.use(require("express-session"))({
    secret: "Russy is a dog",
    resave:true,
})


// Route

app.get("/",function (req,res){
    res.send("home")
})
app.get("/secret", function (req,res){
    res.send("register")
})
app.post("/register",async (req,res)=>{
    const user = await User.create({
        email : req.body.email,
        password : req.body.password
    })
    return res.status(200).json(user)
})

// showing login data
app.get("/login", function (req,res){
    res.send("login")
})

// handling user login

app.post("/login", async function (req,res){
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const result = req.body.password === user.password;
            if (result) {
                res.send("secret")
            }
            
        }
    } catch () {
        
    }
})
