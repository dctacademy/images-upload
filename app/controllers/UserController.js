const express = require("express")
const _ = require("lodash")
const usersController = {}
const { User } = require("../models/User")


usersController.all = (req,res) => {
    User.find()
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.send(err)
        })
}

usersController.register = (req, res) => {
    const body = req.body 
    // console.log(body)
    const user = new User(body)
    user.image = req.file
    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch((err) =>{ 
            res.json(err)
        })
}
usersController.login =(req,res) => {
    const body = _.pick(req.body,["email","password"])
    User.findByCredentials(body.email,body.password)
        .then(user => {
            return user.generateToken()
        })
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send({errors: err})
        })
}

usersController.delete = (req,res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{ tokens: [] })
        .then(() => {
            res.send({success: "successfully logged out"})
        })
        .catch(err => {
            res.send(err)
        })
}

usersController.account = (req,res) => {
    const token = req.token
    User.findOne({"tokens.token": token})
        .then(user => {
            res.send({
                id: user._id, 
                fullName: user.fullName, 
                role: user.role, 
                token,
                email: user.email,
                image: user.image
            })
        })
        .catch(err => {
            res.send(err)
        })
}
usersController.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    delete body.image
    if(!_.isEmpty(req.file)){
        body.image = req.file
    }
    User.findByIdAndUpdate({"_id": id}, body, {new: true})
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports = usersController
