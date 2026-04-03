// third party imports
import express from "express";

// local imports
import userRouter from "./src/features/user/user.router.js";
import server from "./server.js";
import { ApplicationError, errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";

server.use(express.json());

server.use("/user", userRouter);

// error handler
server.use(errorHandlerMiddleware);