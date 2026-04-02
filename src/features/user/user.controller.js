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
            return res.statusCode(response.code).json({});
        } else {
            return res.statusCode(response.code).json({});
        }
    }
}