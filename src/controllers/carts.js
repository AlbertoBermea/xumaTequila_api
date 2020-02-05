const Cart = require('../models/cart')

const createCartItem = function(req, res){
    const cart = new Cart(req.body)
    cart.save().then(function() {
      return res.send(cart)
    }).catch(function(error) {
      return res.status(400).send(error)
    })
}

const updateCartItem = function(req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['numberOfItems']
    // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  
    if( !isValidUpdate ) {
      return res.status(400).send({
        error: 'Invalid update, only allowed to update: ' + allowedUpdates
      })
    }
    // ya no solo buscamos por id, si no también deberia de ser de el owner
    // del todo por lo tanto usamos findOneAndUpdate para pasarle mas datos
    Cart.findByIdAndUpdate(_id, req.body ).then(function(cart) {
    //Product.findOneAndUpdate({ _id }, req.body ).then(function(product) {
      if (!cart) {
        return res.status(404).send({ error: `Cart Item with id ${_id} not found.`})
      }
      return res.send(cart)
    }).catch(function(error) {
      res.status(500).send({ error: error })
    })
  }

  const deleteCartItem = function(req, res) {
    const _id = req.params.id
    Cart.findOneAndDelete( _id ).then(function(cart){
      if(!cart) {
        return res.status(404).send({ error: `Cart Item with id ${_id} not found.`})
      }
      return res.send(cart)
    }).catch(function(error) {
      res.status(505).send({ error: error })
    })
  }
//esto aun esta mal
  const deleteCartsUser = function(req, res) {
    const user = req.params.user
    Cart.deleteMany( {user},function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
  }
  

  const getCartItemsByCustomer = function(req, res) {
    // solo podemos hacer GET de los todos del usuario que hizo login
    const user = req.params.user
    Cart.find({user}).then(function(cart) {
      res.send(cart)
    }).catch(function(error){
      res.status(500).send(error)
    })
  }

  const cartExist = function(req,res){
    const user = req.params.user
    const product = req.params.product
    Cart.find({user,product}).then(function(cart) {
      res.send(cart)
    }).catch(function(error){
      res.status(500).send(error)
    })
  }

  module.exports = {
      createCartItem: createCartItem,
      deleteCartItem: deleteCartItem,
      updateCartItem: updateCartItem,
      getCartItemsByCustomer: getCartItemsByCustomer,
      deleteCartsUser: deleteCartsUser,
      cartExist: cartExist
  }