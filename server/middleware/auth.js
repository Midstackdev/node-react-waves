const { User } = require('../models/user')

let auth = (req, res, next) => {
  let token = req.cookies.w_auth

  User.findByToken(token, (err, user) => {
    if(err) throw err
    if(!user) return res.status(400).json({ success:false, errors: { message: 'User doesn\'t exist.' }}); 
    
    req.token = token
    req.user = user
    next()
  })

}

module.exports = { auth }