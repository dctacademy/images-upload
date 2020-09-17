const mongoose = require("mongoose")

const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Schema = mongoose.Schema
const userSchema = new Schema({
    fullName: {
        type: String,
        minlength: [4, 'Full Name is short'],
        required: [true, 'Full Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
            validator: value => {
                return validator.isEmail(value)
            },
            message: () => {
                return "Email is invalid"
            }
        }
    },
    password: {
        type: String,
        minlength: [6, 'Password is too short'],
        required: [true, 'Password is required']
    },
    tokens: [{
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    role: {
        type: String,
        default: 'client'
    },
    image: {
        type: Object
    }
})

userSchema.pre("save", function(next){
    const user = this
    if(user.isNew){
        encryptPassword = () => {
            return bcrypt.genSalt(10)
                .then(salt => {
                    return bcrypt.hash(user.password,salt)
                        .then(encPass => {
                            user.password = encPass
                        })
                })
        }
        setRole = () => {
            return User.countDocuments()
                .then(count => {
                    if(count == 0){
                        user.role = "admin"
                    }
                })
        }
        return Promise.all([encryptPassword(),setRole()])
            .then(values => {
                next()
            })
            .catch(err => {
                return Promise.reject(err.message)
            })
    }else{
        next()
    }    
})

userSchema.statics.findByCredentials = function(email,password){
    const User = this
    return User.findOne({email: email})
            .then(user => {
                if(!user){
                    return Promise.reject("invalid credentials")
                }
                else{
                    return bcrypt.compare(password,user.password)
                        .then(result => {
                            if(!result){
                                return Promise.reject("invalid credentials")
                            }else{                                
                                    return Promise.resolve(user)
                            }
                        })
                }                
            })
            .catch(err => {
                return Promise.reject(err)
            })
}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token,"dct123")
    }catch(err){
        return Promise.reject(err)
    }

    return User.findOne({
            _id: tokenData._id,
            "tokens.token": token
        })
}

userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user.id,
        email: user.email,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData,"dct123")
    user.tokens.push({
        token
    })
    return user.save()
        .then(user => {
            return Promise.resolve({
                id: user._id, 
                fullname: user.fullname, 
                role: user.role, 
                token,
                email: user.email
            })
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

const User = mongoose.model("User",userSchema)
module.exports = {
    User
}