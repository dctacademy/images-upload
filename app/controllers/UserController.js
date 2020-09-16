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
    const user = new User(body)
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
            res.send({error: err})
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
    const id = req.params.id
    User.findOne({"_id":id})
        .then(user => {
            res.send({
                id: user._id, 
                fullname: user.fullname, 
                role: user.role, 
                email: user.email
            })
        })
        .catch(err => {
            res.send(err)
        })
}
usersController.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    body.image = req.file
    // console.log(req.file)
    User.findByIdAndUpdate({"_id": id}, body, {new: true})
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports = usersController
