const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const Users = require('./models/Users');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db_connect = require('./config/db');
let initial_path = path.join(__dirname, "public");

const app = express();

app.use(express.static(initial_path));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(fileupload());

db_connect();

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
    try {
        let file = req.files.image;
        let date = new Date();
        // image name
        let imagename = date.getDate() + date.getTime() + file.name;
        // image upload path
        let path = './public/uploads/' + imagename;
        
        // create upload
        file.mv(path, (err, result) => {
            if(err){
                // throw err;
            } else{
                // our image upload path
                res.json(`uploads/${imagename}`)
            }
        }) 
    } catch (err) {
        console.log(err);
    }
})

app.post('/signup' , async (req , res) => {
    const { username , email , password } = req.body;
    const userId = uuidv4();
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password,saltRound);
    try {
        console.log("in sign up route");
        const sanitizedEmail = email.toLowerCase();
        const userExist = await Users.findOne({email: sanitizedEmail}).exec() ;
        
        console.log(userExist);
        if(userExist){
            return res.status(400).send('user already exists');
        }
        const data = await Users.create({email : sanitizedEmail, hashed_password : hashedPassword , user_id : userId , name : username});
        const token = jwt.sign({user_id : userId},process.env.SECRET_KEY,{
            expiresIn: '1d'
        });
        res.status(201).json({token : token , user_id : userId , email : sanitizedEmail });
        console.log("done");
    } catch (error) {
        console.log(error);
    }

})
app.post('/login' , async (req , res) => {
    try {
        console.log("here in login route")
        const { email , password } = req.body;
        const sanitizedEmail = email.toLowerCase();
        console.log(sanitizedEmail);
        const userExist = await Users.findOne({ email : sanitizedEmail }).exec();
        console.log(userExist);
        if(!userExist){
            res.json({message : "user not exist"});
        }else{
            const correctPassword =  await bcrypt.compare(password,userExist.hashed_password);
            const { user_id }  = userExist;
            if(correctPassword){
                const token = jwt.sign({ user_id },process.env.SECRET_KEY,{
                    expiresIn: '1d',
                });
                res.status(201).json({token , user_id , email : sanitizedEmail });
            }else{
                res.send("Not Valid Credentials");
            }
        }
        
    } catch (error) {
        console.log(error);
    }   
})
app.post('/publish' , (req,res) => {
    
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})