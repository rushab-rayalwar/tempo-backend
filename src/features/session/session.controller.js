// third party imports


// local imports
import SessionRepository from "./session.repository.js";
import Session from "./session.schema.js";


export default class SessionController {

    constructor(){
        this.repository = new SessionRepository();
    }

    async addSession(req,res,next){
        try{
            let userId = req.user._id;
            let response = await this.repository.addSession(req.body, userId);
            if(response.success){
                return res.status(response.code).json({success:true, message:response.message, data:response.data});
            } else {
                return res.status(response.code).json({success:false, errors:response.errors})
            }
        } catch(error) {
            next(error);
        }
    }

    async getSessions(req,res){
        try{
            let response = await this.repository.getSessions(req.user._id);
            if(response.success){
                return res.status(response.code).json({success:true, message:response.message, data:response.data});
            } else {
                return res.status(response.code).json({success:false, errors:response.errors})
            }
        } catch(error) {
            next(error);
        }
    }
}