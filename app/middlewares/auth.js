const { User } = require("../models/User")

const auth = function(req,res,next) {
    const token = req.header("x-auth")
    if(token){
        User.findByToken(token)
            .then(function(user){
                if(user){
                        req.user = user
                        req.token = token
                        next()
                }else{
                    res.status("401").send({error: "token expired"})
                }
            })
            .catch(function(error){
                res.status("401").send(error)
            })
    }else{
        res.status("401").send({error: "invalid token"})
    }
}

module.exports = {
    auth
}