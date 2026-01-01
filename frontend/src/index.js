import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";         
import Login from "./landing_page/login/Login";
import About from "./landing_page/about/AboutPage";         
import Products from "./landing_page/products/ProductPage";    
import Pricing from "./landing_page/pricing/PricingPage";   
import Support from "./landing_page/support/SupportPage";   

import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/products" element={<Products />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/support" element={<Support />} />
    
          <Route path="*" element={<div className="container py-5"><h1>404 Not Found</h1></div>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

