// third party imports
import express from "express";

// local imports
import CategoryController from "./category.controller.js";

const categoryRouter = express.Router();
const controller = new CategoryController();

// GET methods
categoryRouter.get("/", (req,res,next)=>controller.getCategories(req, res, next));

// POST methods
categoryRouter.post("/", (req,res,next)=>controller.addNewCategory(req,res,next));

// DELETE methods
categoryRouter.delete("/:categoryId", (req,res,next)=>controller.deleteCategory(req,res,next));

export default categoryRouter;