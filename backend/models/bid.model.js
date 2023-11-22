const { default: mongoose } = require("mongoose");

const bidSchema = mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

const BidModel = mongoose.model("bid", bidSchema);
module.exports = BidModel;
