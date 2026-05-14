// third party imports
import express from "express";
import cookieParser from "cookie-parser";

// local imports
import userRouter from "./src/features/user/user.router.js";
import sessionRouter from "./src/features/session/session.router.js";
import categoryRouter from "./src/features/category/category.router.js";
import server from "./server.js";
import { ApplicationError, errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import jwtAuth from "./src/middlewares/jwt.authentication.js";

server.use(express.json());
server.use(cookieParser());

server.use("/api/user", userRouter);
server.use("/api/session", jwtAuth, sessionRouter);
server.use("/api/category", jwtAuth, categoryRouter);

// middleware to handle 404 errors
server.use((req,res,next)=>{
    console.log("Route not found!");
    return res.status(404).json({success:false, errors:["Route not found!"]});
});

// error handler
server.use(errorHandlerMiddleware);