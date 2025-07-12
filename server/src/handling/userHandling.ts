import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client"
import { sendMail } from "../sendmail"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { boolean } from "zod"
import { resetPasswordValidator } from "../validators/user.Validate"

const prisma = new PrismaClient()

export const signup = async (req:Request , res:Response ) => {
    const {name , email , password} = req.body

    const hashedpassword = await bcrypt.hash( password , 10)

    try{
        await prisma.user.create({
            data:{
                name,
                email,
                password: hashedpassword
            }
        })
        
        
        const verificationtoken = jwt.sign({email} , process.env.VERIFY_KEY as string)
        

        await sendMail({
            from: 'process.env.EMAIL_USER',
            to: 'email',
            subject: 'Welcome to RealTimeDocs',
            text: `Please click on the link to verify ${process.env.LINK}/verifyemail/${verificationtoken}`
        })
        return res.status(201).json({message: "User created successfully"})
    }catch(error){
        return res.status(400).json({error: "User not created"})
    }

}


export const verifyEmail = async (req:Request , res:Response) => {
    const verificationtoken = req.params.token

    try {
        const decoded = jwt.verify(verificationtoken ,process.env.VERIFY_KEY as string )

        await prisma.user.update({
            where:{
                email:(decoded as JwtPayload).email
            }, 
            data:{
                isverified:true
            }
        })

        return res.status(200).json({ verified: true,
            message:"Email verified sucessfully"})
    } catch (error) {
        return res.status(400).json({error: "Invalid verificationtoken"})
    }
}

export const signin = async (req:Request , res:Response) => {
    const {email , password} = req.body

    try {
        const user = await prisma.user.findFirst({
        where:email
        })

        if(!user){
            return res.status(400).json({message: "User doesn't exist"})
        }

        const isMatch = bcrypt.compare(password , user.password)

        if(!isMatch){
            return res.status(401).json({message:"User doesn't exist"})
        }

        const token = jwt.sign({email , userId:user.id} , process.env.JWT_KEY as string)

        return res.status(200).json({
            token:token,
            message:"User Sign in sucessfully"
        })
    } catch (error) {
        return res.status(401).json({error: "user failed to sign in"})
    }
    
}

export const validateEmail= async(req:Request , res:Response)=>{
    const {email} = req.body

    try {
        const result= resetPasswordValidator({email} )

    if(!result == true){
        return result
    }

    const user = await prisma.user.findFirst({
        where:email
    })

    if(!user){
        return res.status(400).json({message:"Invalid Email"})
    }

    if(!user.isverified){
        return res.status(400).json({message : "Firstly verify email"})
    }

    return res.status(200).json({message:"Verification link sent to your Gmail"})
    } catch (error) {
        return res.status(400).json({error:""})
    }

}