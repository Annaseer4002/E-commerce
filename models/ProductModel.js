 const mongoose = require ('mongoose')

 const productSchema = new mongoose.Schema({
    productName: { type: String, require: true},
    price: {type: String, require: true},
    inStock: {type: Boolean, require: true},
    description: {type: String, default: ''}
 }, {timestamps: true})

 const ProductModel = mongoose.model('ProductModel', productSchema)
 module.exports = ProductModel;