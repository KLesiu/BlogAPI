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

const Upload = require("./models/Upload")
const Post = require("./models/Post")



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
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/components/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });




app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors())



app.post('/api/posts/:id/upload',upload.single("file"), async(req,res)=>{
 
  const imageName = req.file.filename;
  try{
    const post = await Post.findById(req.params.id)
    await Upload.create({image:imageName,post:post._id})
    res.json({status:"ok"})
  }catch(err){
    res.json({status:"error"})
  }
  return res
})
app.get('/api/posts/:id/upload',async(req,res)=>{
  try{
    Upload.find({}).then(data=>{
      res.send({status:"ok",data:data})
    })
  }catch(error){
    res.json({status:error})
  }
})

app.use('/api/auth',auth)
app.use('/api',post)
app.use('/api',comment)


app.listen(3001,()=>{
    console.log("Server starts at port 3001")
})