const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

dotenv.config({path: './env/.env'})

app.use(cookieParser())

//call router
app.use('/', require('./routes/router'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER UP running on port ${PORT}`);
});