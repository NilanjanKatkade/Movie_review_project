import express from 'express';
import { connecttodb } from './config/db.js';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true,
}))
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello World 4');
})
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        //check of user alrady exists
        const existemail = await User.findOne({ email });
        if (existemail) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existusername = await User.findOne({ username });
        if (existusername) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //hash password
        const hashedpassword = await bcrypt.hash(password, 10);
        //create user
        const Userdoc = await User.create({
            username,
            email,
            password: hashedpassword,
        })

        //JWT

        if (Userdoc) {
            //jwt.sign(payload,secret,optiins,callbacks)
            const token = jwt.sign({ id: Userdoc._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                // path: '/',    

            })
        }
        return res.status(200).json({ user: Userdoc, message: 'User registered successfully' });
    }
    catch (err) {
        res.status(400).json({ message: 'Error during user registration' });
        console.error('Error during user registration:', err);
    }
    // console.log(username,email,password);

})
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const Userdoc = await User.findOne({ username });
        if (!Userdoc) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isPasswordMatch = await bcrypt.compare(password, Userdoc.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        //JWT 
        // if (Userdoc) {
        //     const token = jwt.sign({ id: Userdoc._id }, process.env.JWT_SECRET, {
        //         expiresIn: '7d',
        //     })
        //     res.cookie('token', token, {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV === 'production',
        //         sameSite: 'strict',
        //     })
        // }
        // return res.status(200).json({ user: Userdoc, message: 'User Logged in successfully' });
                // JWT 
        const token = jwt.sign(
            { id: Userdoc._id },        // payload
            process.env.JWT_SECRET,     // secret key
            { expiresIn: '7d' }         // options
        );

        // Set cookie with JWT
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            // path: '/',   
        });

        return res.status(200).json({
            user: Userdoc,
            token, // optional: send token in response too
            message: 'User Logged in successfully',
        });
    }
    catch (err) {
        res.status(400).json({ message: 'Error during user login' });
        console.error('Error during user login:', err);
    }
    
})

app.get('/api/fetch-user',async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:'Invalid token'});
        }
        const Userdoc = await User.findById(decoded.id).select("-password");
        if(!Userdoc){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({user:Userdoc});

    }
    catch(err){
        console.error('Error fetching user:',err.message);
        return res.status(400).json({message:'Error fetching user'});
    }
})

app.post('/api/logout',(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        // path: '/',   
    })
    return res.status(200).json({message:'User Logged out Successfully'});
})

app.listen(PORT, () => {
    connecttodb();
    console.log(`Server is running on port ${PORT}`);
})