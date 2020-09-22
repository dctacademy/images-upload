const express = require("express")
const router = express.Router()
const {auth} = require('../app/middlewares/auth')

const  usersController  = require('../app/controllers/UserController')
const  galleryController  = require('../app/controllers/GalleryController')
const { upload } = require("../app/middlewares/multer")
router.post('/users/register',upload.single('image'), usersController.register)
router.get('/users/all',auth, usersController.all)
router.post('/users/login', usersController.login)
router.get('/users/account', auth, usersController.account)
router.put('/users/edit/:id', auth,upload.single('image'), usersController.update)
router.delete('/users/logout', auth, usersController.delete)
router.get('/galleries',galleryController.all)
router.post('/galleries',auth, upload.array('images',10),galleryController.create)
router.put('/galleries/edit/:id',upload.array('images', 10),galleryController.update)
router.get('/galleries/:id',galleryController.show)
router.delete('/galleries/:id',galleryController.delete)

module.exports = {
    routes: router
}