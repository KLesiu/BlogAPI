const express = require("express")
const mongoose=require("mongoose")
require("dotenv").config()

let routes = require("./routes/route")


// Mongoose connection
mongoose.set("strictQuery",false)
const mongoDB = `mongodb+srv://admin:${process.env.DATA_BASE_PASS}@cluster0.0fxzyfw.mongodb.net/?retryWrites=true&w=majority`
main().catch((err)=>console.log(err))
async function main(){
    await mongoose.connect(mongoDB)
}

const app = express()

routes(app)

app.listen(3000,()=>{
    console.log("Server starts at port 3000")
})