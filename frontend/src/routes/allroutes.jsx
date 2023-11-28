import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Product from "../pages/product/product";
import Sell from "../pages/sell/sell";
import Login from "../pages/login/login";
import Signup from "../pages/login/signup";
import Profile from "../pages/profile/profile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} >  </Route>
      <Route path="/profile/:id" element={<Profile/>} >  </Route>
      <Route path="/login" element={<Login/>} ></Route>
      <Route path="/signup" element={<Signup/>} ></Route>
      <Route path="/product/:id" element={<Product/>} ></Route>
      <Route path="/sell" element={<Sell/>} ></Route>
    </Routes>
  );
};

export default AllRoutes;
