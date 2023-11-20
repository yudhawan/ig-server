const jwt = require('jsonwebtoken');
module.exports = async function authServices(req,res) {
    const{token}=req.query
    const verify = token&&await jwt.verify(token,process.env.PRIVATE_KEY)
    if(verify){
        return res.json({token,username:verify?.username})
    }
    return res.status(400).json({message:'expired'})
}