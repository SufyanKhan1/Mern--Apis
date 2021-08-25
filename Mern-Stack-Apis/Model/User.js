const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
  
  Username:
  { type:String, required:true},

  Password :
  { type:String, required:true},

 
 })

 module.exports=mongoose.model('USERS',UserSchema)

