import "./src/config/dotenv.config.js";

// third party imports
import express from "express";

// local imports
import connectToDB from "./src/config/mongoose.config.js";

const server = express();
const port = process.env.PORT || 3000;

server.listen(port, ()=>{
    console.log("Server is listening on port "+port);
    connectToDB();
});

export default server;