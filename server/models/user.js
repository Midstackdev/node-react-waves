const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SALT = 10

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 50
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
})

userSchema.pre('save', function(next) {
  let user = this

  if(user.isModified('password')) {
    bcrypt.genSalt(SALT, function(err, salt) {
      if(err) return next(err)
  
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err)
        user.password = hash
        next()
      })
    })
  }else {
    next()
  }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  let user = this

  const token = jwt.sign(user._id.toHexString(), process.env.JWT_TOKEN_SECRET)

  user.token = token
  user.save(function(err, user) {
    if(err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function (token, cb) {
  let user = this

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, function(err, decode) {
    user.findOne({'_id': decode, 'token':token}, function(err, user) {
      if(err) return cb(err)
      cb(null, user)
    })
  })
}

userSchema.statics.allowedValues = (user) => {
  return {
    isAdmin: user.role === 0 ? false : true,
    isAuth: true,
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    role: user.role,
    cart: user.cart,
    history: user.history,
  }
}

const User = mongoose.model('User', userSchema)

module.exports = { User }