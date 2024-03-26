const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require("./models/user")

app.use(cors());
app.use(express.json());

mongoose.connect(
    'mongodb+srv://sharma08462:fFUkrhXzURhlnfbu@cluster0.aalncvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)

app.post('/register', async(req,res) => {
    const{username,password} = req.body;
    try{
        const userDoc = await User.create({username,password});
        res.json(userDoc);
    }catch(err){
        res.status(400).json(err);
    }
    //res.json({requestData:{username,password}})      
});

app.listen((8080),() => {
    console.log("server is listening")
})   

// fFUkrhXzURhlnfbu
// sharma08462
// mongodb+srv://sharma08462:fFUkrhXzURhlnfbu@cluster0.aalncvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://sharma08462:<password>@cluster0.aalncvq.mongodb.net/