// now the person routes file to update the post method this method is use for the signup.
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtsuthmiddleware = (req, res , next) =>
{
    // first check the token is authorise or not 
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: "token not found"});
    // request header this token ne nikalsu(extract)
    // jyare token bne chene teni agal ek name "bearer" ena pachhi token hoy che.
    // tena lidhe split(' ')[1] write krvama aave che.
    const token = req.headers.authorization.split(' ')[1];
 // jo token naa mle
 if(!token) return res.status(401).json({error : "unauthorised"});

 // mle to 
 try {
    // verify the jwt token
    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    // user information pass the server
req.user = decoded;
next();
 } catch (error) {
    console.log(error);
    res.status(401).json({error : "invalid token"});
 }
}
// generate the token function.
// if require the payload . so this use the userdata for gen. token
const generatetoken = (userdata)=>
{
    // generate the new JWT token using the user data
    return jwt.sign(userdata , process.env.JWT_SECRET , {expiresIn : 300000}); //  inside expirationIn for the expire time
}
module.exports = {jwtsuthmiddleware , generatetoken};