const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/userSchema')

SECRET_KEY = 'secretkey123'

//connect to express app
const app = express()


//connect to mongodb
const dbURI = 'mongodb+srv://anjanipb:P9gefPrxE8VsUpKd@cluster30.temjeho.mongodb.net/UsersDB?retryWrites=true&w=majority'
mongoose.connect(dbURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    app.listen(3000,()=>{
        console.log('mongo db conected');
    })
    
    })
    .catch((error)=>{
        console.log("Unable to connect server and/or MongoDB");
})


//middleware
app.use(bodyparser.json())
app.use(cors())


//routes
//user registration
//post register
app.post('/register', async (req,res)=>{
    try{
        const{ email, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({ email, username, password: hashedPassword})
        await newUser.save()
        res.status(201).json({ message: 'User created Successfully'})
    }
        catch(error){
            res.status(500).json({error: 'Error singing up'})
        }

    })

//get registred users
// app.get('/register', async(req,res)=>{
//     try{
//         const users = await User.find(
//             res.status(201).json(users)
//         )
//         }catch(error){
//             res.status(500).json({error:"Unable to get users"})
//     }
// })

app.get('/register', async (req,res)=>{
    try{
        const users = await User.find()
            res.status(201).json(users)
        
    }
        catch(error){
            res.status(500).json({error:"Unable to get users"})
        }

    })

    //GET login
    app.post('/login', async (req,res)=>{
        try{
            const {username,password} = req.body
            const user = await User.findOne({ username })
            if(!user){
                return res.status(401).json({error:'invalid credentials'})
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid){
                return res.status(401).json({ error:'Invalid credentials'})
            }
            const token = jwt.sign({userId:user._id}, SECRET_KEY, {expiresIn:'1hr' })
            res.json({ message : 'Login successfull'})
        }catch(error){
            res.status(500).json({error : 'error logging in'})
        }
    })