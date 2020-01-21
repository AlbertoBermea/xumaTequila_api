const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
		required: true
    },
    numberOfItems:{
        type: Number,
		required: true
    },
    
})

const cart = mongoose.model('Cart', cartSchema)

module.exports = cart