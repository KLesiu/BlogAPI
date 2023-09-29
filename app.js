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

// app.post('/api/posts/:id/upload',upload.single("image"),async(req,res)=>{
//     console.log(req.body)
//     const imageName = req.file.filename
//     try {
      
//         //check if the request has an image or not
//         if (!req.file) {
//         console.log(false)
//          return res.json({
//             success: false,
//             message: "You must provide at least 1 file"
//           });
//         } else {
          
            
//             const post = await Post.findById(req.params.id)
            
//           let imageUploadObject = {
//             image:imageName,
            
//             post:post._id
//           };
        
          
//           const uploadObject = new Upload(imageUploadObject);
//           // saving the object into the database
//           const uploadProcess = await uploadObject.save()
//           const updatePost = await post.updateOne({image:uploadObject._id})
//         }
//       } catch (error) {
        
//         res.status(500).send("Server Error");
//       }
// })
// app.get('/api/posts/:id/upload',async(req,res)=>{
//   const PostWithPhoto = await Post.findOne({_id:req.params.id}).exec()
//   if(PostWithPhoto===null) return res.status(404).json('Post not found')
//   const photo = await Upload.findById(PostWithPhoto.image)
//   return res.json(photo)
// })

app.post('/api/posts/:id/upload',upload.single("file"), async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
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