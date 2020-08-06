const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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

const User = mongoose.model('User', userSchema)

module.exports = { User }