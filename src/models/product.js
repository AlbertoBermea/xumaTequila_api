const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	cost: {
        type: Number, 
        required: true
    },
    discount: {
        type: Number, 
        required: true, 
        default: 1
    },
	image: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: true
	},
	size: {
		type: String,
		required: true,
		default: "Medium"
	}
})

const product = mongoose.model('Products', productSchema)

module.exports = product