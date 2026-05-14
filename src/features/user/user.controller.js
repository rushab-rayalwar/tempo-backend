// third party imports
import jwt from "jsonwebtoken";

// local imports
import UserRepository from "./user.repository.js";


export default class UserController {

    constructor(){
        this.respository = new UserRepository();
    }

    async signUp(req,res,next){
        let userData = req.body;
        let response = await this.respository.signUp(userData);
        if(response.success){
            return res.status(response.code).json({success:true, message:response.message, data:response.data});
        } else {
            return res.status(response.code).json({success:false, errors:response.errors});
        }
    }
    async signIn(req,res,next){
        let credentials = req.body;
        let response = await this.respository.signIn(credentials);
        if(response.success){
            let token = jwt.sign({_id:response.data._id, email:response.data.email, name:response.data.name}, process.env.JWT_SECRET, {expiresIn:"1h"});
            response.data.token = token;
            return res.cookie("jwt", token, {maxAge: 1*60*60*1000, httpOnly: true}).status(response.code).json({success:true, message:response.message, data:response.data});
        } else {
            return res.status(response.code).json({success:false, errors:response.errors});
        }
    }
} 