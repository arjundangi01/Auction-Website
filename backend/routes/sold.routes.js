const express = require("express");
const soldRouter = express.Router();
soldRouter.post('/all', async (req, res) => {
    try {
        console.log('req for sold');
        res.send({msg:'hii'})
  } catch (error) {
    console.log( 'in', error)
  }  
})

module.exports = soldRouter