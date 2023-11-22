const connection = require("./config/db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const bidRouter = require("./routes/bid.routes");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
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

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("server started");
  } catch (error) {
    console.log(error);
  }
});
