// third party imports
import express from "express";

// local imports
import userRouter from "./src/features/user/user.router.js";
import server from "./server.js";
import { ApplicationError, errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";

server.use(express.json());

server.use("/user", userRouter);

// middleware to handle 404 errors
server.use((req,res,next)=>{
    console.log("Route not found!");
    return res.status(404).json({success:false, errors:["Route not found!"]});
});

// error handler
server.use(errorHandlerMiddleware);