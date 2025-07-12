import expresss from 'express'
import { SigninAuthentication, SignupAuthentication } from '../middleware/authentication'
import { signin, signup, validateEmail, verifyEmail } from '../handling/userHandling'
const user = expresss.Router()


user.post("/signup" , SignupAuthentication , signup)
user.put("/verify/:verificationtoken" , verifyEmail)
user.post("/signin", SigninAuthentication , signin)
user.post("/forgot-password" ,validateEmail )


export default user
