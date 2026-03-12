import express from "express"
import router from "./routers/index.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routers/auth.js"
dotenv.config()
const app = express()
app.use(express.json())

const port = 3000
app.use("/", router)
app.use("/auth", authRouter)

mongoose.connect(process.env.MONGO_URI).then(
    console.log("connected to mongodb")
).catch((err)=>{
    console.log(err)
})

app.listen(port, ()=>{
    console.log(`server is ruuning on ${port}`)
})
