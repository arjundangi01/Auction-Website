const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    startBid: Number,
    startDate: String,
    endDate: String,
    description: String,
    productImage: String,
    soldBy: String,
    latestBid: {
      type: Number,
      default: 0,
    },
    purchaseBy: {
      type: String,
      default: "",
    },
    purchaseByName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
