const express = require("express")
const router = express.Router()
const {auth} = require('../app/middlewares/auth')

const  usersController  = require('../app/controllers/UserController')
const { upload } = require("../app/middlewares/multer")
router.post('/users/register', usersController.register)
router.get('/users/all',auth, usersController.all)
router.post('/users/login', usersController.login)
router.get('/users/account', auth, usersController.account)
router.put('/users/edit/:id', auth,upload.single('image'), usersController.update)
router.delete('/users/logout', auth, usersController.delete)


module.exports = {
    routes: router
}