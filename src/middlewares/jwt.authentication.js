// third party imports
import jwt from "jsonwebtoken";


// local imports


export default async function jwtAuth (req,res,next) {
    try{
        let userData = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.user = userData;
        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            errors: ["Unauthorized access"]
        });
    }
}