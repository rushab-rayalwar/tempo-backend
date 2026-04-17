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
            if(!userData || !userData.name || !userData.email || !userData.password){ 
                return {success:false, code:400, errors:["Name, Email and Password fields cannot be empty"]};
            }

            // validate password
            // Password must be at least 8 characters long and contain:
            // - at least one lowercase letter
            // - at least one uppercase letter
            // - at least one number
            // - at least one special character
            let passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/; // NOTE THIS : 
            let passwordIsValid = passwordRegex.test(userData.password);
            if(!passwordIsValid){
                return {success:false, code:400, errors:["Password must be at least 5 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."]};
            }

            // validate email
            let emailIsValid = validator.isEmail(userData.email);
            if(!emailIsValid){
                return {success:false, code:400, errors:["Email is invalid."]};
            }
            // check if user exists
            let existingUser = await User.findOne({ email : userData.email.trim().toLowerCase() });
            if(existingUser){
                return {success:false, code:409, errors:["Email already exists."]}
            }

            let newUser = new User(
                {
                    name : userData.name,
                    email : userData.email,
                    password : await bcrypt.hash(userData.password, 10)
                }
            );
            let newDoc = await newUser.save();

            return {success:true, message:"User created successfully.", code:200, data:{...newDoc._doc, password:null, _id:null}}; 
        } catch(error) {
            console.log("Could not signUp", error);
            throw new ApplicationError("Could not sign up, something went wrong!", 500);
        }
    }

    async signIn(credentials){
        try{

            if( !credentials.email || !credentials.password ){
                return {success:false, code:400, errors:["Email and Password are required!"]};
            }

            // validate email
            let user = await User.findOne({email : credentials.email});
            if(!user){
                return {success:false, code:401, errors:["User does not exist!"]};
            }

            // validate password
            let passwordIsValid = await bcrypt.compare(credentials.password, user.password);
            if(!passwordIsValid){
                return {success:false, code:401, errors:["Invalid password!"]};
            }

            return {success:true, code:200, message:"User logged in successfully!", data:{...user._doc, password:null}};
        } catch(error) {
            console.log("Could not sign in!", error);
            throw new ApplicationError("Could not sign in, something went wrong!", 500);
        }
    }
}