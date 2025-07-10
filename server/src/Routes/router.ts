import expresss from 'express'
import user from './userRouter'

const router = expresss.Router()

router.use("/user" , user)

router.use("/document" , )


export default router