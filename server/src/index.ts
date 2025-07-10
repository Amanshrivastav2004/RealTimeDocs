import express from 'express'
import cors from 'cors'
import router from './Routes/router'
import {config} from 'dotenv'
const app = express()

config()

app.use(cors())

console.log('Timezone:', process.env.TZ);
console.log('Current time:', new Date().toString());

app.use(express.json())

app.use("/api/v1" , router)

app.listen(3000)