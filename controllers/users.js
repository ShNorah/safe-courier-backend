import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/users.js";

//signin controller
export const signin = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        
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
    const {email, password, confirmPassword, firstName, lastName, userRole} = req.body

    try{
        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(404).json({message: "user already exists"})
        };
        
        if(!password===confirmPassword) {
            return res.status(400).json({message: "passwords don't match"})
        };
        
        const hashedPassword = await encrypt_password(password);
        
        const newUser = await User.create({email, userRole, password: hashedPassword, name:`${firstName} ${lastName}`});
        if(newUser) {
            const token = create_token(newUser)
            const userData = {
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                password: newUser.password,
                userRole: newUser.userRole,
                token:token,
            }
            res.status(200).json(userData);
        }


    }catch(error){
        res.status(500).json({message:'something went wrong'});

    }
}
//This is a helper function that creates a token
const create_token = ({email, password, _id}) => {
    const token = jwt.sign({
        email,
        password,
        id:_id
    }, 'test', {expiresIn: '24h'})
    return token;
}
//This is a helper function that encrypts/hashes the password
const encrypt_password = async (password) =>{
    try {
        const result = await bcrypt.hash(password, 12);
        return result;
    } catch (error) {
        console.log(error)
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
