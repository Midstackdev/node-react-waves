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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Models 
const { User } = require('./models/user')
const { Brand } = require('./models/brand')
const { Wood } = require('./models/wood')
const { Product } = require('./models/products')

// Middleware
const { auth } = require('./middleware/auth')
const { admin } = require('./middleware/admin')

// Routes 

// Products Routes
app.post('/api/product/article', auth,admin, (req, res) => {
  const product = new Product(req.body)

  product.save()
  .then((product) => {
    return res.status(200).json({ success:true, data: product});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})

// /api/product/articles?sort=sold&order=desc&limit=4&skip=5 
app.get('/api/product/articles', auth,admin, (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sort = req.query.sort ? req.query.sort : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 100
  let skip = req.query.skip ? req.query.skip : 0

  Product.find({})
  .populate('brand')
  .populate('wood')
  .sort([[sort, order]])
  .limit(limit)
  .exec()
  .then((products) => {
    return res.status(200).json({ success:true, data: products});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})

// /api/product/article?=id=FHEJWBS&type=single 
app.get('/api/product/article', auth,admin, (req, res) => {
  let type = req.query.type
  let items = []

  if(type === 'array') {
    let ids = req.query.ids.split(',')
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item)
    })
    console.log(items)
  }
  Product.find({'_id':{$in:items}})
  .populate('brand')
  .populate('wood')
  .exec()
  .then((products) => {
    return res.status(200).json({ success:true, data: products});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})

app.get('/api/product/article/:id', auth,admin, (req, res) => {
  Product.find({})
  .then((products) => {
    return res.status(200).json({ success:true, data: products});
  })
  .catch(error => {
    return res.status(400).json({ success:false, errors: error});
  })
})


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

app.get('/api/product/wood', (req, res) => {
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

app.get('/api/product/brand', (req, res) => {
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