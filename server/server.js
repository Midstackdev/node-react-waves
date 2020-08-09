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
  useCreateIndex: true,
  useFindAndModify: false
}
mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`, options)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

// Models 
const { User } = require('./models/user')
const { Brand } = require('./models/brand')
const { Wood } = require('./models/wood')

// Middleware
const { auth } = require('./middleware/auth')
const { admin } = require('./middleware/admin')

// Routes 

// Wood Routes
app.post('/api/product/wood', auth,admin, (req, res) => {
  const wood = new Wood(req.body)

  wood.save()
  .then((wood) => {
    return res.status(200).json({ success:true, data: wood});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})

app.get('/api/product/wood', auth, (req, res) => {
  Wood.find({})
  .then((woods) => {
    return res.status(200).json({ success:true, data: woods});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})

// Brand Routes
app.post('/api/product/brand', auth,admin, (req, res) => {
  const brand = new Brand(req.body)

  brand.save()
  .then((brand) => {
    return res.status(200).json({ success:true, data: brand});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})

app.get('/api/product/brand', auth, (req, res) => {
  Brand.find({})
  .then((brands) => {
    return res.status(200).json({ success:true, data: brands});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})


// User Routes
app.get('/api/users/auth', auth, (req, res) => {
  return res.status(200).json({ success:true, data: User.allowedValues(req.user)});
})

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

app.get('/api/users/logout', auth, (req,res) => {
  User.findByIdAndUpdate({_id: req.user._id}, {token: ''})
  .then(() => {
    return res.status(200).json({ success:true, data: {}})
  })
  .catch(err => {
    return res.status(400).json({ success:false, errors: err})
  })
})

const port = process.env.PORT

app.listen(port, () => console.log(`server running on port ${port}`))