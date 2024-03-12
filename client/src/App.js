
import './App.css';
import Home from './components/pages/Home';
import React from "react";
import { Route, Routes } from "react-router-dom";
import About from './components/pages/About';
import { useDispatch} from 'react-redux';
import { fetchProducts } from './redux/products.redux';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import NotFound from './components/pages/NotFound';
import Product from './components/pages/Product';
import ProductCart from './components/pages/CartPage';
import OrderSummary from './components/pages/OderSummary';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import { checkLoggedInUser } from './components/utils/LocalStorage';
import Order from './components/pages/Order';
import SignOut from './components/pages/SignOut';
import CartPage from './components/pages/CartPage';
import MyOrders from './components/pages/MyOrders';





const App = () => {
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    checkLoggedInUser(dispatch);
  }, [dispatch]);

  return (
    <main> 
      
      <Header />
        <Routes>
        
           <Route path="/" element={<Home />} />
  
        <Route path="/about" element={<About/>} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/order" element={<Order />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/order-summary" element={<OrderSummary />} />

        <Route path="/product/:id" element={<Product />} />

     

        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />

        <Route path="*" element={<NotFound />} />
          
      
      
        
        </Routes>
      
      
    </main>
  );
}

export default App;
