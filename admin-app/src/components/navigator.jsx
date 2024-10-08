import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import AddProduct from "./addProduct";
import AuthRegister from "../auth/auth-register";
import AuthLogin from "../auth/auth-login";
import ProtectedRoute from "../route/protectedRoute";
import Dashboardlayout from "../layout/dashboardlayout";
import ProductUpdate from "./updateproduct";
import Category from "./category";
import Graph from "./graph";
import Profile from "./profile";
import TableToPdf from "./tabletopdf";

const Navigator = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboardlayout />
            </ProtectedRoute>
          }
        >
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/auth-register" element={<AuthRegister />} />
            <Route path="/update/:id" element={<ProductUpdate />} />
            <Route path="/category" element={<Category/>}></Route>
            <Route path="/graph" element={<Graph/>}></Route>
            <Route path="/profile/:id" element={<Profile/>}></Route>
            <Route path="/tablepdf" element={<TableToPdf/>}></Route>
        </Route>
        <Route path="/" element={<AuthLogin />} />
      </Routes>
    </>
  );
};





export default Navigator;
