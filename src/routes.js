const express = require('express')
const router = express.Router()

const users = require('./controllers/users.js')
const products = require('./controllers/products.js')
const auth = require('./middleware/auth')
const authAdmin = require('./middleware/authAdmin')

router.get('/users', auth, users.getUser)
router.post('/login', users.login)
router.post('/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)


router.get('/product/:id',products.getProduct) //buscar producto por id
router.get('/products',products.getProducts) //buscar todos los productos
router.get('/productsCat/:category',products.getProductsCat) //buscar los productos de una cateroia especifica
router.post('/product', authAdmin , products.createProduct) //hacer solo admin // crear un nuevo producto
router.patch('/product/:id', authAdmin , products.updateProduct) //hacer solo admin // actualizar datos de un producto
router.delete('/product/:id', authAdmin , products.deleteProduct) //hacer solo admin // eliminar datos de un producto

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router

