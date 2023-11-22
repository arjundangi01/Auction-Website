const express = require("express");
const authentication = require("../middlewares/authentication.middleware");
const ProductModel = require("../models/product.model");
const productRouter = express.Router();

productRouter.get('/all',  async (req, res) => {
   
    try {
        const allProduct = await ProductModel.find({});
        // console.log(allProduct)
        res.send(allProduct)
    } catch (error) {
        console.log(error)
        res.send({message:'internal error'})
    }
})
productRouter.get('/single/:id',  async (req, res) => {
   const {id }= req.params
    try {
        const product = await ProductModel.findOne({_id:id});
        res.send(product)
    } catch (error) {
        console.log(error)
        res.send({message:'internal error'})
    }
})
productRouter.post('/add', authentication, async (req, res) => {
    const input = req.body;
    const userId = req.userId;
    try {
        const newProduct = await ProductModel.create({ ...input, soldBy: userId });
        res.send({message:'product added'})
    } catch (error) {
        console.log(error)
        res.send({message:'internal error'})
    }
})



module.exports = productRouter;