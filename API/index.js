const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require("./models/user")

//Bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const secret = "lkiu87gfbxse4365fg";

//jwt
const jwt = require('jsonwebtoken');

app.use(cors({credentials:true , origin:'http://localhost:5173'}));
app.use(express.json());

mongoose.connect(
    'mongodb+srv://sharma08462:fFUkrhXzURhlnfbu@cluster0.aalncvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)

app.post('/register', async(req,res) => {
    const{username,password} = req.body;
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const userDoc = await User.create({
            username,
            password: hash,
        });
        res.json(userDoc);
    }catch(err){
        res.status(400).json(err);
    }
    //res.json({requestData:{username,password}})      
});

app.post('/login',async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const match = await bcrypt.compare(password, userDoc.password);
        if (match) {
            //res.json({ message: 'Login successful' });
            jwt.sign({username,id:userDoc._id},secret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json('ok');
            })
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
})





app.listen((8080),() => {
    console.log("server is listening")
})   

// fFUkrhXzURhlnfbu
// sharma08462
// mongodb+srv://sharma08462:fFUkrhXzURhlnfbu@cluster0.aalncvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://sharma08462:<password>@cluster0.aalncvq.mongodb.net/