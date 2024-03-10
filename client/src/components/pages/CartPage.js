import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import CartItem from '../pages/CartItem';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState({ products: [] });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {
      products: [],
    };
    setCart(storedCart);
  }, []);

  const updateCart = (productId, newCount) => {
    const updatedCart = { ...cart };
    const productIndex = updatedCart.products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex !== -1) {
      updatedCart.products[productIndex].count = newCount;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const removeProduct = (productId) => {
    const updatedCart = { ...cart };
    const productIndex = updatedCart.products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex !== -1) {
      updatedCart.products.splice(productIndex, 1);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const totalPrice = cart.products.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

  if (cart.products.length === 0) {
    return (
      <Container>
        <h1>Cart is empty</h1>
        <Link to="/">
          <Button variant="outline-dark">Shop Now</Button>
        </Link>
      </Container>
    );
  }


  const handleSubmit = () => {
    navigate('/order-summary');
  };

  return (
    <Container>
      <h1>Cart</h1>
      {cart.products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          updateCart={updateCart}
          removeProduct={removeProduct}
        />
      ))}
      <h5 className="my-5">Total Price: ${totalPrice}</h5>
      <Button variant="outline-dark" onClick={handleSubmit}>
        Order Summary
      </Button>
    </Container>
  );
};

export default CartPage;