const Product = require('../models/product')

//esto primero
//crear producto nuevo
const createProduct = function(req, res){
    const product = new Product(req.body)
    product.save().then(function() {
      return res.send(product)
    }).catch(function(error) {
      return res.status(400).send(error)
    })
}

  const updateProduct = function(req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','category','cost','discount','image','descripcion','active']
    // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  
    if( !isValidUpdate ) {
      return res.status(400).send({
        error: 'Invalid update, only allowed to update: ' + allowedUpdates
      })
    }
    // ya no solo buscamos por id, si no también deberia de ser de el owner
    // del todo por lo tanto usamos findOneAndUpdate para pasarle mas datos
    Product.findByIdAndUpdate(_id, req.body ).then(function(product) {
    //Product.findOneAndUpdate({ _id }, req.body ).then(function(product) {
      if (!product) {
        return res.status(404).send({ error: `Product with id ${_id} not found.`})
      }
      return res.send(product)
    }).catch(function(error) {
      res.status(500).send({ error: error })
    })
  }


  const deleteProduct = function(req, res) {
    const _id = req.params.id
    Product.findOneAndDelete( {_id} ).then(function(product){
      if(!product) {
        return res.status(404).send({ error: `Product with id ${_id} not found.`})
      }
      return res.send(product)
    }).catch(function(error) {
      res.status(505).send({ error: error })
    })
  }

  const getProducts = function(req, res) {
    // solo podemos hacer GET de los todos del usuario que hizo login
    Product.find().then(function(products) {
      res.send(products)
    }).catch(function(error){
      res.status(500).send(error)
    })
  }


  const getProduct = function(req, res) {
    // solo podemos traer el todo si es que es del usuario que hizo login
    const _id = req.params.id
    Product.findOne({_id}).then(function(product) {
      if(!product){
        return res.status(404).send({ error: `Product with id ${_id} not found.`})
      }
      return res.send(product)
    }).catch(function(error) {
      return res.status(500).send({ error: error })
    })
  }


  const getProductsCat = function(req, res) {
    const category = req.params.category
    // solo podemos hacer GET de los todos del usuario que hizo login
    Product.find({category}).then(function(products) {
      res.send(products)
    }).catch(function(error){
      res.status(500).send(error)
    })
  }


module.exports = {
    createProduct : createProduct,
    updateProduct : updateProduct,
    deleteProduct : deleteProduct,
    getProducts : getProducts,
    getProduct : getProduct,
    getProductsCat : getProductsCat
  }