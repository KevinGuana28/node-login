const express = require('express')
const router = express.Router()

const conexion = require('../database/db')
const authController = require('../controllers/authController')

//Vistas

router.get('/', (req, res)=>{
    res.render('login',{alert:false})
})

router.get('/index', authController.isAuthenticated,(req, res)=>{
    res.render('index', {user:req.user})
})

router.get('/register', (req, res)=>{
    res.render('register')
})


//Controladores
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
module.exports = router