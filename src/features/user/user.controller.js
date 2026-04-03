// third party imports


// local imports
import UserRepository from "./user.repository.js";


export default class UserController {

    constructor(){
        this.respository = new UserRepository();
    }

    async signUp(req,res,next){
        let userData = req.body;
        let response = this.respository.signUp(userData);
        if(response.success){
            return res.statusCode(response.code).json({success:true, message:response.message, data:response.data});
        } else {
            return res.statusCode(response.code).json({success:false, errors:response.errors});
        }
    }
    async signIn(req,res,next){
        let credentials = req.body;
        let response = this.respository.signIn(credentials);
        if(response.success){
            return res.statusCode(response.code).json({success:true, message:(await response).message, data:response.data});
        } else {
            return res.statusCode(response.code).json({success:false, errors:response.errors});
        }
    }
}