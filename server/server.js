const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`, options)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

// Models 
const { User } = require('./models/user')

// Routes Users
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save()
  .then((user) => {
    return res.status(200).json({ success:true, data: user});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})

app.post('/api/users/login', (req, res) => {
  User.findOne({'email': req.body.email})
  .then(user => {
    if(!user) return res.status(404).json({ success:false, errors: { message: 'User email doesn\'t exist.' }})

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.status(400).json({ success:false, errors: { message: 'Password is incorrect.' }})

      user.generateToken((err, user) => {
        if(err) return res.status(400).json({ success:false, errors: { message: err }})
        res.cookie('w_auth', user.token).status(200).json({ success:true, data: user})
      })
    })
  })
})

const port = process.env.PORT

app.listen(port, () => console.log(`server running on port ${port}`))