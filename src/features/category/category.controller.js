// third party imports


// local imports
import CategoryRepository from "./category.repository.js"

export default class CategoryController {
    constructor(){
        this.repository = new CategoryRepository();
    }

    async addNewCategory(req,res,next){
        try{
            let response = await this.repository.addNewCategory(req.body.title, req.user._id);
            if(response.success){
                return res.status(response.code).json({success:true, data:response.data, message:response.message});
            } else {
                return res.status(response.code).json({success:false, errors:response.errors})
            }
        } catch(error) {
            next(error);
        }
    }

    async getCategories(req,res,next){
        try{
            let response = await this.repository.getCategories(req.user._id);
            if(response.success){
                return res.status(response.code).json({success:true, data:response.data, message:response.message});
            } else {
                return res.status(response.code).json({success:false, errors:response.errors})
            }
        } catch(error) {
            next(error);
        }
    }

    async deleteCategory(req,res,next){
        try{
            let response = await this.repository.deleteCategory(req.body.title, req.user._id);
            if(response.success){
                return res.status(response.code).json({success:true, data:response.data, message:response.message});
            } else {
                return res.status(response.code).json({success:false, errors:response.errors})
            }
        } catch(error) {
            next(error);
        }
    }
}