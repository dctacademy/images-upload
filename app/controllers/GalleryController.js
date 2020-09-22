const express = require("express")
const _ = require("lodash")
const galleryController = {}
const { Gallery } = require("../models/Gallery")


galleryController.all = (req,res) => {
    Gallery.find({"userId": req.user.id})
        .then(galleries => {
            res.send(galleries)
        })
        .catch(err => {
            res.send(err)
        })
}

galleryController.create = (req, res) => {
    const body = req.body 
    body.userId = req.user.id
    body.images = req.files
    const gallery = new Gallery(body)
    gallery.save()
        .then((gallery) => {
            res.json(gallery)
        })
        .catch((err) =>{ 
            res.json(err)
        })
}

galleryController.delete = (req,res) => {
    const id = req.params.id
    Gallery.findByIdAndDelete({"_id":id} )
        .then(() => {
            res.send({success: "successfully deleted"})
        })
        .catch(err => {
            res.send(err)
        })
}

galleryController.show = (req,res) => {
    const id = req.params.id
    Gallery.findOne({"_id":id})
        .then(gallery => {
            res.send(gallery)
        })
        .catch(err => {
            res.send(err)
        })
}
galleryController.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    body.images = req.files
    Gallery.findByIdAndUpdate({"_id": id}, body, {new: true})
        .then(gallery => {
            res.send(gallery)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports = galleryController
