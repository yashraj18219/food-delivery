// import "./style.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { setCartListener } from "./utils/cart";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/LoginRoute";
import AppLayout from "./components/AppLayout";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import DeliveryPartnerOrders from "./components/DeliveryPartnerOrders";
import MyOrders from "./components/MyOrders";

function App() {
  const [, setCartVersion] = useState(0);
  useEffect(() => {
    setCartListener(() => setCartVersion((v) => v + 1));
    return () => setCartListener(null);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<LoginRoute />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Body />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="delivery" element={<DeliveryPartnerOrders />} />
            <Route path="restaurants/:resId" element={<RestaurantMenu />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
