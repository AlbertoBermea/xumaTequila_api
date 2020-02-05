const express = require('express')
const router = express.Router()

const users = require('./controllers/users.js')
const products = require('./controllers/products.js')
const cart = require('./controllers/carts.js')
const auth = require('./middleware/auth')
const authAdmin = require('./middleware/authAdmin')

router.get('/users',  users.getUsers)
router.get('/user/:id',  users.getUser)
router.post('/login', users.login)
router.post('/logout',  users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', users.updateUser)
router.delete('/users', users.deleteUser)

router.get('/product/:id',products.getProduct) //buscar producto por id
router.get('/products',products.getProducts) //buscar todos los productos
router.get('/productsCat/:category',products.getProductsCat) //buscar los productos de una cateroia especifica
router.post('/product',  products.createProduct) //hacer solo admin // crear un nuevo producto
router.patch('/product/:id',  products.updateProduct) //hacer solo admin // actualizar datos de un producto
router.delete('/product/:id', products.deleteProduct) //hacer solo admin // eliminar datos de un producto

router.get('/cart/:user', cart.getCartItemsByCustomer)
router.post('/cart',cart.createCartItem)
router.patch('/cart/:id',cart.updateCartItem)
router.delete('/cart/:id',cart.deleteCartItem)
router.delete('/cartUser/:user',cart.deleteCartsUser)
router.get('/cart/:user/:product',cart.cartExist)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router

