let admin = (req, res, next) => {
  if(req.user.role === 0) {
    return res.status(400).json({ success:false, errors: { message: 'You dont have permissions for this.' }});
  }
  next()
}

module.exports = { admin }