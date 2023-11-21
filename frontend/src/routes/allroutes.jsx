import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Product from "../pages/product/product";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} >  </Route>
      <Route path="/login"></Route>
      <Route path="/product/:id" element={<Product/>} ></Route>
    </Routes>
  );
};

export default AllRoutes;
