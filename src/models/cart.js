const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: String
    },
    product: {
        type: String,
		required: true
    },
    numberOfItems:{
        type: Number,
		required: true
    },
    cost: {
        type: Number, 
        required: true
    }    
})

const cart = mongoose.model('Cart', cartSchema)

module.exports = cart