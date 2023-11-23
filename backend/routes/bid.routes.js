const express = require("express");
const BidModel = require("../models/bid.model");
const ProductModel = require("../models/product.model");
const bidRouter = express.Router();

bidRouter.post("/add", async (req, res) => {
  const input = req.body;

  try {
    const newBid = await BidModel.create(input);
    
    res.send({ message: "new bid added" });
  } catch (error) {
    console.log(error);
    res.send({ message: "internal error" });
  }
});
bidRouter.get("/all/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const allBid = await BidModel.find({productId:id},{}).sort({bidAmount:-1});
    res.send(allBid);
  } catch (error) {
    console.log(error);
    res.send({ message: "internal error" });
  }
});


module.exports = bidRouter;
