import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/users.js";

//signin controller
export const signin = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const existingUser = User.findOne({email});
        
        if(!existingUser) return res.status(404).json({message: "user doesn't exist"});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        
        if(!isPasswordCorrect) return res.status(400).json({message: "invalid credentials"});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})
        
        res.status(200).json({result: existingUser, token})
        
    }catch(error){
        res.status(500).json({message:'something went wrong'});
    }
    
}

//signup controller
export const signup = async(req, res)=>{
    const {email, password, confirmPassword, firstName, lastName} = req.body

    try{
        const existingUser = User.findOne({email});
        
        if(existingUser) return res.status(404).json({message: "user already exists"});
        
        if(!password===confirmPassword) return res.status(400).json({message: "passwords don't match"});
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = await User.create({email, password: hashedPassword, name: `${firstName}, ${lastName}`});
        
        const token = jwt.sign({email: newUser.email, id: newUser._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({newUser, token});

    }catch(error){
        res.status(500).json({message:'something went wrong'});

    }
}

//get users controller
export const getUsers = async(req, res) =>{
    try{
        const registeredUsers = await User.find();

        res.status(200).json(registeredUsers);

    }catch(error){
        res.status(404).json({message: error.message});
        
    }
}
