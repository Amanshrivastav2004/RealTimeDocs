import express from 'express'
import { SigninAuthentication, SignupAuthentication } from '../middleware/authentication'
import { resetpassword, signin, signup, validateEmail, verifyEmail, verifyresetToken } from '../handling/userHandling'
const user = express.Router()


user.post("/signup" , SignupAuthentication , signup)
user.put("/verify/:verificationtoken" , verifyEmail)
user.post("/signin", SigninAuthentication , signin)
user.post("/forgot-password" , validateEmail )
user.get("/reset-password/:resetToken" , verifyresetToken )
user.put("/reset-password" , resetpassword)

export default user
