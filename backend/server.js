const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
var bcrypt = require('bcryptjs');
const cors = require('cors');
const ws = require('ws');
const cookieParser = require('cookie-parser');
var bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const serverUrl = "http://localhost";
dotenv.config()
mongoose.connect(process.env.MONGO_URI)




const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // replace with the origin of your client
  credentials: true,
}));



//keep user logged in
app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(null);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    res.json(data);
  } catch (error) {
    res.json(null);
  }
});



//login a user
app.post("/login", async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if (!user) {
    return res.status(400).json({ error: 'Username not found' });
  }
  else{
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Wrong password' });
    }else{
      jwt.sign({userId: user._id,username}, process.env.JWT_SECRET, (err, token) => {
        res.cookie("token", token, {sameSite:'none', secure:true}).status(201).json({
          id: user._id,
        })
      });
    }
  }
});




//Register a new user
app.post("/register", async (req, res) => {
    const {username, email, password} = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, bcryptSalt);
      const createdUser = await User.create({username, email, password:hashedPassword});
      jwt.sign({userId: createdUser._id,username}, process.env.JWT_SECRET, (err, token) => {
        res.cookie("token", token, {sameSite:'none', secure:true}).status(201).json({
          id: createdUser._id,
        })
      });
    } catch (err) {
      if (err.code === 11000) {
        // This is the error code for a duplicate key error in MongoDB
        return res.status(400).json({ error: 'Username or email already in use' });
      }
      console.log(err);
      return res.status(500).json({ error: 'Server error' });
    }
});



const server = app.listen(process.env.PORT, () => {
  console.log('listening for requests on port', process.env.PORT)
})


const wss = new ws.WebSocketServer({ server });
wss.on('connection', (connection, req) => {
  console.log(req.header)
});