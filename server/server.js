const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(`${process.env.DB_URL}${process.env.DN_NAME}`, options)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT

app.listen(port, () => console.log(`server running on port ${port}`))