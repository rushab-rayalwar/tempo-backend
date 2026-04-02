// third party
import mongoose from "mongoose";

// local imports


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email : {
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;