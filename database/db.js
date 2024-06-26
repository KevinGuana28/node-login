const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
})

conexion.connect((error)=>{
    if(error){
        console.log('Error de conexion es: '+error)
        return
    }
    console.log('Conexion con exito')
})

module.exports = conexion