
import { Request, Response } from "express";
import { createUserServices, getUserByEmailService } from "./auth.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLoginValidator, UserValidator } from "../validation/user.validator";

export const createUser=async(req:Request,res:Response)=>{
try {
    const parseResult=UserValidator.safeParse(req.body)

    if(!parseResult.success){
        res.status(400).json({error:parseResult.error.issues})   
        return
     }

const user=parseResult.data

const userEmail=user.email

const existingUser=await getUserByEmailService(userEmail)

if(existingUser){
    res.status(400).json({error:"user already exists"})
    return
}

const salt =bcrypt.genSaltSync(10)
const hashedPassword=bcrypt.hashSync(user.password,salt)
user.password=hashedPassword

const newUser=await createUserServices(user)

res.status(200).json(newUser)

} catch (error) {
    res.status(500).json({error:error.message || "Failed to register user"})
}
}


export const loginUser=async(req:Request,res:Response)=>{
    try {
        const parseResult=UserLoginValidator.safeParse(req.body)
        if(!parseResult.success){
            res.status(400).json({error:parseResult.error.issues})
            return
        }

        const {email,password}=parseResult.data

        const user =await getUserByEmailService(email)

        if(!user){
            res.status(404).json({error:"User not found"})
            return
        }

        const isMatch=bcrypt.compareSync(password,user.password)

        if(!isMatch){
            res.status(200).json({error:"Invalid password"})
            return
        }

       let payload ={
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            //expiresIn: "1h" // Optional: Set token expiration
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // Token expires in 1 hour
        }

        let secret =process.env.JWT_SECRET as string
        const token=jwt.sign(payload,secret)

        res.status(200).json({token,userId:user.userId,userName:user.userName, email:user.email , userType:user.userType})
        
    } catch (error) {
        res.status(500).json({error:error.message|| "Failed to login user"})
        
    }
}