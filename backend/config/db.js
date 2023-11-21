const mongoose = require('mongoose');
require('dotenv').config()

const connection = mongoose.connect(`${process.env.MONGO_URI}/auction_app`);

module.exports = connection