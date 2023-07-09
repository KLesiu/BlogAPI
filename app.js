const express = require("express")
const mongoose=require("mongoose")
require("dotenv").config()
const jwt = require("jsonwebtoken")
let bodyParser = require("body-parser")
let routes = require("./routes/auth")
let auth = require('./routes/auth')
const passportConfig = require('./config/passport').passportConfig()

// Mongoose connection
mongoose.set("strictQuery",false)
const mongoDB = `mongodb+srv://admin:${process.env.DATA_BASE_PASS}@cluster0.0fxzyfw.mongodb.net/?retryWrites=true&w=majority`
main().catch((err)=>console.log(err))
async function main(){
    await mongoose.connect(mongoDB)
}

passportConfig


const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use('/api/auth',auth)


app.listen(3000,()=>{
    console.log("Server starts at port 3000")
})