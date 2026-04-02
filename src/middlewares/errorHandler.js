import logger from "../config/winston.config.js";

export class ApplicationError extends Error{
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export function errorHandlerMiddleware(error, req, res, next){
    logger.error(error.message);
    res.statusCode(error.statusCode).json({success:false, errors:["Something went wrong!"]});
}