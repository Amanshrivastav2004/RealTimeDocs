import expresss from 'express'
import { SignupAuthentication } from '../middleware/authentication'
import { signup } from '../handling/userHandling'
const user = expresss.Router()


user.post("/signup" , SignupAuthentication , signup)




export default user
