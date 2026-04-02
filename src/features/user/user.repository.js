// third party imports
import validator from "validator";
import bcrypt from "bcrypt";

// local imports
import User from "./user.schema.js";
import { ApplicationError } from "../../middlewares/errorHandler.js";

export default class UserRepository {
    constructor(){}
    async signUp(userData){
        try{
            // validate userData
            if(!userData.name || !userData.email || !userData.password){
                return {success:false, code:400, errors:["Name, Email and Password fields cannot be empty"]};
            }

            // validate password
            let passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/; // NOTE THIS
            let passwordIsValid = passwordRegex.test(userData.password);
            if(!passwordIsValid){
                return {success:false, code:400, errors:["Password must be at least 5 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."]};
            }

            // validate email
            let emailIsValid = validator.isEmail(userData.email);
            if(!emailIsValid){
                return {success:false, code:400, errors:["Email is invalid."]};
            }

            let newUser = new User(
                {
                    name : userData.name,
                    email : userData.email,
                    password : bcrypt.hash(userData.password, 10)
                }
            );
            let newDoc = await newUser.save();

            return {success:true, message:"User created successfully.", code:200, data:{...newDoc, password:null, _id:null}};
        } catch(error) {
            console.log("Could not signUp");
            throw new ApplicationError("Something went wrong!", 500);
        }
    }

    async signIn(credentials){
        try{
            let user = User.findOne({})
        } catch(error) {

        }
    }
}