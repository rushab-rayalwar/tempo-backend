//third-party imports
import express from "express";

//local imports
import UserController from "./user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

//GET
userRouter.get("/login",(req,res,next)=>userController.signUp(req,res,next));

//POST
userRouter.post("/register",(req,res,next)=>userController.signUp(req,res,next));


export default userRouter;