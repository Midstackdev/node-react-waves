const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unoque: true,
    maxlength: 100
  },
  description: {
    required: true,
    type: String,
    maxlength: 1000000
  },
  price: {
    required: true,
    type: Number,
    maxlength: 255
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  wood: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wood',
    required: true
  },
  shipping: {
    required: true,
    type: Boolean
  },
  available: {
    required: true,
    type: Boolean
  },
  frets: {
    required: true,
    type: Number
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0
  },
  publish: {
    required: true,
    type: Boolean,
  },
  images: {
    type: Array,
    default: []
  }

}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = { Product }