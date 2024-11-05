require('dotenv').config();
const jwt = require('jsonwebtoken');


const authentication = {
    authenticateToken : async(req, res, next) =>{
        const token = req.headers['authorization'];
        if (token == null) return res.status(401).json({success:false,message:'Unauthorized user'});
      console.log(token.split(" ")[1]);

        jwt.verify(token.split(" ")[1],  process.env.SECRET_KEY, (err, user) => {
          if (err) {  
          console.log(err)
          return res.status(403).json({success:false,message:'Incorrect Token'});
          }
          req.user = user;
          next();
    });
}
      }



  module.exports =authentication;