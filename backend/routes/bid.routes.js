const express = require("express");
const BidModel = require("../models/bid.model");
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


module.exports = bidRouter;
