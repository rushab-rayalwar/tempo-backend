// third party imports
import express from "express";

// local imports
import server from "./server.js";
import ApplicationError, { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";

server.use(express.json());

server.use("/user", userRouter);

// error handler
server.use(errorHandlerMiddleware);