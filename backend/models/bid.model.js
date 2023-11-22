const { default: mongoose } = require("mongoose");

const bidSchema = mongoose.Schema(
  {
    createdBy: String,
    bidAmount: Number,
    productId: String,
  },
  {
    timestamps: true,
  }
);

const BidModel = mongoose.model("bid", bidSchema);
module.exports = BidModel;
