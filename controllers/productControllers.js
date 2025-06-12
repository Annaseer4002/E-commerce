
const ProductModel = require("../models/ProductModel")



const handleCreateProduct = async (req, res) => {

    try {
        const { productName, price, inStock, description } = req.body
        
        if(!productName){
            return res.status(404).json({message:'please fill the required fields'})
        }

        if(!price){
            return res.status(404).json({message:'please fill the required fields'})
        }

        if(!inStock){
            return res.status(404).json({message:'please fill the required fields'})
        }

const newProduct = new ProductModel({
    productName,
    price,
    inStock,
    description
})

await newProduct.save()
res.status(201).json({message: 'product create successfully'})


    } catch (error) {
        res.status(404).json(error.message)
    }
   
}
  
const handleFindAllProducts = async (req, res) => {
try {
    
    const findAllProduct = await ProductModel.find()


} catch (error) {
    res.status(404).json(error.message)
}
}   

const handleUpdateProduct = async (req, res)=> {
    const { id } = req.params

    const { productName, price, inStock, description } = req.body

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
        productName, price, inStock, description }, {new: true})

        if(!updatedProduct){
            return res.status(404).json({message:'product not found'})
        }

        await updatedProduct.save()

        res.status(201).json({
            message:'Success',
            updatedProduct
        })
}



   
module.exports = {
    handleCreateProduct,
    handleFindAllProducts,
    handleUpdateProduct
}

