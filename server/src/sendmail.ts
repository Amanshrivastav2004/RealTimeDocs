import nodemailer, { SendMailOptions } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

const transpoter = nodemailer.createTransport({
    port:465,
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    } , 
    secure: true
})

export const sendMail = async (mailoptions: SendMailOptions)=>{

    try {
        const info = await transpoter.sendMail(mailoptions)
        return info
    } catch (error) {
        throw error
    }
} 