const express = require("express");
const authentication = require("../middlewares/authentication.middleware");
const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.mode");
const BidModel = require("../models/bid.model");
const productRouter = express.Router();

productRouter.get('/all',  async (req, res) => {
    const filter = {};
    const { q } = req.query;
    if (q) {
        filter['productName'] = { $regex: new RegExp("^" + q, "i") }
    }
    try {
        const allProduct = await ProductModel.find(filter);
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
        const product = await ProductModel.findOne({ _id: id });
        const owner = await UserModel.findOne({ _id: product.soldBy })
        const highestBid = await BidModel.findOne({productId:id}).sort({
            bidAmount: -1,
        });
        // console.log(highestBid)
        res.send({product,owner,highestBid:highestBid?.bidAmount})
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