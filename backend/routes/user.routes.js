const express = require("express");
const UserModel = require("../models/user.mode");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const authentication = require("../middlewares/authentication.middleware");
const userRouter = express.Router();


userRouter.get("/login_user",authentication,  async (req, res) => {
  const  userId  = req.userId;
  // console.log(userId)
  try {
    const user = await UserModel.findOne({ _id: userId },{password:0,__v:0});
    // delete user.password
    res.send({user});
  } catch (error) {}
});

userRouter.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(req.body)
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      bcrypt.hash(password, 2, async function (err, hash) {
        const newUser = await UserModel.create({ userName,email, password: hash });
        // console.log(newUser)
        let token = jwt.sign({ userId: newUser._id }, "json_secret");
        res.send({ message: "User registered successful", token });
      });
    }
  } catch (error) {
    res.send({ message: "Internal Error" });

    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      bcrypt.compare(password, existingUser.password, function (err, result) {
        // result == true
        if (result) {
          let token = jwt.sign({ userId: existingUser._id }, "json_secret");
          res.send({ message: "User login successful", token });
        } else {
          res.send({ message: "Entered wrong details" });
        }
      });
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    res.send({ message: "Internal Error" });

    console.log(error);
  }
});

module.exports = userRouter;
