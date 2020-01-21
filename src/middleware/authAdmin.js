const jwt = require('jsonwebtoken')

const User = require('../models/user')

const authAdmin = function( req, res, next ) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'suSuperSecret')
    User.findOne({ _id: decoded._id, 'tokens.token': token }).then(function(user) {
      if(!user) {
        throw new Error()
      }
      req.token = token
      req.user = user
      if(req.user.admin){
        next()
      }
      else{
          throw new Error()
      }
    }).catch(function(error) {
      res.status(401).send({ error: 'No eres admin Bro Sorry'})
    })
  } catch(e) {
    res.status(401).send({ error: 'No eres admin Bro Sorry'})
  }
}


module.exports = authAdmin