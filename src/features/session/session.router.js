// third party imports
import express from "express";

// local imports
import SessionController from "./session.controller.js";

const sessionRouter = express.Router();
const controller = new SessionController();

// GET methods
sessionRouter.get("/", (req,res,next)=>controller.getSessions(req,res,next));

// POST methods
sessionRouter.post("/add", (req,res,next)=>controller.addSession(req,res,next));

export default sessionRouter;