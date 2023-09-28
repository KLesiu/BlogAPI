const express = require("express")

const mongoose=require("mongoose")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const path=require("path")
let bodyParser = require("body-parser")
let auth = require('./routes/auth')
let post = require("./routes/post")
let comment = require("./routes/comment")
const passportConfig = require('./config/passport').passportConfig()
const cors= require("cors")
const multer = require("multer")
const Upload = require("./models/Upload")



// Mongoose connection
mongoose.set("strictQuery",false)
const mongoDB = `mongodb+srv://admin:${process.env.DATA_BASE_PASS}@cluster0.0fxzyfw.mongodb.net/?retryWrites=true&w=majority`
main().catch((err)=>console.log(err))
async function main(){
    await mongoose.connect(mongoDB)
}

passportConfig


const app = express()

// Multer options
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors())

app.post('/api/posts/create/upload',upload.single("file"),async(req,res)=>{
    
    try {
        //check if the request has an image or not
        if (!req.file) {
        console.log(false)
         return res.json({
            success: false,
            message: "You must provide at least 1 file"
          });
        } else {
            let fileN=req.body.filename
            
          let imageUploadObject = {
            file: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            },
            fileName: fileN
          };
          console.log(imageUploadObject)
          
          const uploadObject = new Upload(imageUploadObject);
          // saving the object into the database
          const uploadProcess = await uploadObject.save()
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
})


app.use('/api/auth',auth)
app.use('/api',post)
app.use('/api',comment)


app.listen(3001,()=>{
    console.log("Server starts at port 3001")
})