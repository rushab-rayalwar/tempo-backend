// third party imports
import mongoose from "mongoose";

// local imports
import { ApplicationError } from "../../middlewares/errorHandler.js";
import Session from "./session.schema.js";


export default class SessionRepository {
    constructor(){

    }

    async addSession(sessionData, userId){
        try{
            // validate incoming data
            if( !sessionData.title || !sessionData.categoryId || !sessionData.startTime || !sessionData.endTime || sessionData.durationInMinutes == null ) {
                return { success:false, errors:["Incomplete data for regestering a new session!"], code:400}
            }

            // create new mongodb object
            let newSession = new Session({...sessionData, userId});
            await newSession.save();

            // return success
            return {success:true, code:200, message:"Session created successfully!"}
        } catch(error) {

            console.log(error);

            if (error.name === "ValidationError") {
                return {
                    success: false,
                    errors: [error.message],
                    code: 400
                };
            }

            if (error.name === "CastError") {
                return {
                    success: false,
                    errors: [`Invalid value for ${error.path}`],
                    code: 400
                };
            }

            throw new ApplicationError("Could not register new session, something went wrong!", 500);
        }
    }
    
    async getSessions(userId){
        try{

            let sessions = await Session
                                .find({userId : new mongoose.Types.ObjectId(userId)})
                                .sort({createdAt : -1})
                                .lean();

            return {success:true, data:sessions, message:"Sessions fetched successfully!", code:200}

        } catch(error) {

            console.log(error);

            throw new ApplicationError("Could not fetch sessions, something went wrong!", 500);
        }
    }
}