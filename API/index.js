const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require("./models/user")
const fs = require('fs');
const Post = require('./models/post');
//Bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const secret = "lkiu87gfbxse4365fg";
//jwt
const jwt = require('jsonwebtoken');
//cookie-parser
const cookieParser = require('cookie-parser');
//multer
const multer = require("multer");
const uploadMiddleware = multer({dest:'uploads/'})

//Middlewares
app.use(cors({credentials:true , origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser())


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
                res.cookie('token', token).json({
                    id:userDoc._id,
                    username,
            });
        })
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
})

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info)
    })
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})

app.post('/post' , uploadMiddleware.single('file'), async (req,res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync([path, newPath ]);

     const {title,summary,content} = req.body;
     const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
    })

    res.json(postDoc);

})



app.listen((8080),() => {
    console.log("server is listening")
})   

