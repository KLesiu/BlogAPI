const mongoose = require("mongoose");
const Schema = mongoose.Schema
const UploadSchema = new mongoose.Schema({
  
  image:{type:String},
  post:{type:Schema.Types.ObjectId,ref:"Post",required:true},
});

module.exports = mongoose.model("Upload", UploadSchema);