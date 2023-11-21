import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Product from "../pages/product/product";
import Sell from "../pages/sell/sell";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} >  </Route>
      <Route path="/login"></Route>
      <Route path="/product/:id" element={<Product/>} ></Route>
      <Route path="/sell" element={<Sell/>} ></Route>
    </Routes>
  );
};

export default AllRoutes;
