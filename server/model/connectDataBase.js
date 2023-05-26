require("dotenv").config();

const mongoose = require('mongoose');

const connectDataBase=async ()=>{

    const response=await mongoose.connect(process.env.DB_URL);
    
   console.log("Connected to DataBase");

    return response;
}

module.exports=connectDataBase; 