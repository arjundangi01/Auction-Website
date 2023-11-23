const connection = require("./config/db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const bidRouter = require("./routes/bid.routes");
require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");
const ProductModel = require("./models/product.model");
const BidModel = require("./models/bid.model");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/bids", bidRouter);

app.use("/sold", bidRouter);

// const today = new Date().toISOString().split('T')[0];
// console.log(today);
cron.schedule(
  "0 0 * * *",
  async () => {
    const today = new Date().toISOString().split("T")[0];
    let allProductsToUpdate = await ProductModel.find({ endDate: today });
    console.log(allProductsToUpdate)
    for (let product of allProductsToUpdate) {
      let maxBid = await BidModel.findOne({ productId: product._id }).sort({
        bidAmount: -1,
      });
      
      // console.log(maxBid)
      if (maxBid) {
        product.purchaseBy = maxBid.createdBy;
        product.purchaseByName = maxBid.userName;
        await product.save();
      } else {
        product.purchaseBy = 'Expire';
        await product.save();

      }
    }
    // let allProducts = await ProductModel.updateMany({ endDate: today }, { $set: {} });
    // console.log(allProducts);
  },
  {
    timezone: "Asia/Kolkata",
  }
);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("server started");
  } catch (error) {
    console.log(error);
  }
});
