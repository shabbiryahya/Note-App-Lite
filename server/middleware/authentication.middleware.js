const jwt=require("jsonwebtoken");

require("dotenv").config();
const secret=process.env.JWT_SECRET;

const authentication=(req,res,next)=>{

    if(!req.headers.authorization){
        return res.status(401).send("Please Login");
    }
    const token=req.headers.authorization.split(" ")[1];
    // console.log("token",token);
    jwt.verify(token,secret,(error,decode)=>{

  if(error){

    res.send("Please Login");
  }

  req.user=decode;
  console.log(decode);
    })

    next();
    
}

module.exports=authentication;

