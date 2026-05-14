import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true,
        maxLength : 100
    },
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    startTime :{
        type : Date,
        required : true
    },
    endTime : {
        type: Date,
        required : true
    },
    durationInMinutes : {
        required : true,
        type : Number
    }
}, {timestamps : true});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

export default Session;