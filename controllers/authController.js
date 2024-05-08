const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

//Promesa nos va a devolver favorable o no
const {promisify} = require('util')
const { error } = require('console')

//const { use } = require('../routes/router')
//const { error } = require('console')

//Regitrar
exports.register = async(req, res)=>{
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)
        //console.log(passHash)
        
        conexion.query('INSERT INTO users SET ?', {user:user, name:name, pass:passHash}, (error, results)=>{
            if(error){
                console.log(error)
            }
            res.redirect('/')
        })

    } catch (error) {
        console.log(error)
    }
}


exports.login = async(req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass
        //console.log(name + pass)
        
        if(!user || !pass){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: '/'
            })
        }else{
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
                if(results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login',{
                        alert:true,
                        alertTitle: "Advertencia",
                        alertMessage: "Usuario u/o contraseña incorrecta",
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/'
                    })
                }else{
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    console.log("TOKEN generado:" +token+"para el usuario: "+user)

                    const cookieOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions)
                    res.render('login',{
                        alert:true,
                        alertTitle: "Conexion exitosa",
                        alertMessage: "Login correcto",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: 'index'
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results) => {
                if (!results) {
                    return next(); // Pasar al siguiente middleware
                }
                req.user = results[0];
                return next(); // Pasar al siguiente middleware
            });
        } catch (error) {
            console.log(error);
            return next(error); // Pasar al siguiente middleware con el error
        }
    } else {
        res.redirect('/');
    }
};


exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}