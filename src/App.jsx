import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Category";
import CategoryProducts from "./pages/CategoryProducts";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import ShippingScreen from "./components/ShippingScreen";
import PaymentScreen from "./components/PaymentScreen";
import OrderDetailsScreen from "./components/OrderDetails";
import PrivateRoute from "./components/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  return (
    <Router>
     
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Product />} /> {/* Product listing */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<PrivateRoute><MyOrders /></PrivateRoute>}/>
            <Route path="/place-order" element={<PrivateRoute><PlaceOrder /></PrivateRoute>}/>
            <Route path="/order/:id" element={<OrderDetailsScreen />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:category" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
          </Routes>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;

