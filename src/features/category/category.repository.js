// third party imports
import mongoose from "mongoose";

// local imports
import Category from "./category.schema.js";
import {ApplicationError} from "../../middlewares/errorHandler.js";


export default class CategoryRepository{
    constructor(){}

    async addNewCategory(title, userId){
        try {
            let newCategory = new Category({title, userId});
            await newCategory.save();

            return {success:true, message:"Category created successfully", data:newCategory, code:200}
        } catch (error) {
            if(error.code === 11000){
                return {
                    success : false,
                    code : 400,
                    errors : "Category already exists!"
                }
            }
        }
    }
    async getCategories(userId){
        try {
            let categories= await Category.find({userId}).sort({title:1}).lean();

            return {success:true, code:200, message:"Categories fetched successfully!", data:categories || []}
        } catch(error){
            throw new ApplicationError("Could not fetch categories, something went wrong!", 500);
        }
    }
    async deleteCategory(title, userId){
        try{
            let result = await Category.deleteOne({userId : new mongoose.Types.ObjectId(userId), title});
            if(result.deletedCount == 0){
                return {success:false, code:400, errors:["Does not exist!"]}
            }
            return {success:true, code:200, message:"Category deleted successfully!", data:null}
        } catch(error){
            throw new ApplicationError("Could not delete the category, something went wrong!", 500);
        }
    }
}