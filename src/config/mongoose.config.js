import mongoose from "mongoose";

const url = process.env.DB_URL;

export default async function connectToDB(){
    try{
        await mongoose.connect(url);
        console.log("Connected to mongoDB");
    } catch(error) {
        console.log("Could not connect to the DB");
    }
}