import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { customRequest } from "../interfaces/interfaces";

const prisma = new PrismaClient()

export const createdocument=async (req:customRequest , res:Response) => {
    const {title , content}= req.body
    const userId = req.userId

    if(!userId){
        return res.status(400)
    }

    try {
    const document = await prisma.document.create({
        data:{
            title,
            content,
            userId
        }
    })

    return res.status(200).json({message:"Document created" , document })
    } catch (error) {
        return res.status(400).json({error : (error as Error).message})
    }
   
}

export const allDocuments = async (req:customRequest , res:Response , next:NextFunction)=>{
    const userId = req.userId

    try {
    const documents = await prisma.document.findMany({
        where:{userId:userId}
    })

    return res.status(200).json({documents})

    } catch (error) {
        return res.status(400).json({error:(error as Error).message})
    }

}

export const searchDocument = async (req:customRequest , res:Response , next:NextFunction) => {

    const {filter} = req.query

    const userId = req.userId

    try {
        const documents = await prisma.document.findMany({
            where:{
                userId,
                title:{
                    contains:filter as string,
                    mode:"insensitive"
                }
            }
        })

        return res.status(200).json({documents})
    } catch (error) {
        return res.status(400).json({error:(error as Error).message})
    }

}

export const deleteDocument= async (req:customRequest , res:Response , next:NextFunction)=>{
    const userId = req.userId

    const docId = Number(req.params.docId)

    if(!docId){
        return res.status(400).json({error:"Document id not recieved"})
    }

    try {
        const document = await prisma.document.findFirst({
            where:{id:docId }
        })

        if(!document){
            return res.status(400).json({error:"Document Invalid"})
        }

        if(document.userId !== userId){
            return res.status(400).json({error:"You are not authorized"})
        }

        await prisma.document.delete({
            where:{id:docId}
        })

    } catch (error) {
        
    }

}