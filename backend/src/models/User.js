import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  hashedPassword:{
    type:String,
    require: true,

  },
  email:{
    type:String, 
    require: true,
    unique: true,
    lowercase: true,
    trim: true,

  },
  displayName:{
    type:String,
    require: true,
    trim: true
  },
  avatarUrl:{
    type: String,   //Link CDN de hien thi hinh
  },
  avatarId:{
    type:String,  //Cloudinary public_id de xoa hinh
  },
  bio:{
    type:String,
    maxlength: 500, //tuy
  },
  phone:{
    type:String,
    sparse:true
  },


},
{
  timestamps:true,
}
);
const User = mongoose.model("User", userSchema);
export default User;