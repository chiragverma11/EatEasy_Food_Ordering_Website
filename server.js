const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
// const flash = require('connect-flash')
require('dotenv').config()

const app = express()

//Mongoose Connection
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

//Express Static
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css/'))
app.use('/js', express.static(__dirname + '/public/js/'))
app.use('/img', express.static(__dirname + '/public/img/'))

//Express Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

//Listen
app.listen(
  process.env.PORT,
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
)