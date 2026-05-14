// third party imports
import mongoose from "mongoose";

// local imports

const categorySchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        trim:true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {timestamps : true});

categorySchema.index({userId:1, title:1}, {unique:true});

const Category = mongoose.model("Category", categorySchema);

export default Category;