const  JWT_SCERET = require('../utils/config')
const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {

    const authorization = req.headers.authorization
    if(!authorization && !authorization.startsWith('Bearer')) res.status(403).json({})

    const token = authorization.split(' ')

    try{
        const decoded = jwt.verify(token, JWT_SCERET)
        if(decoded.userId) {
            req.userId = decoded.userId
            next()
        }
        else{
            res.status(403).json({})
        }

    }
    catch(e){
        json.status(403).json({})
    }
    
}
module.exports = auth