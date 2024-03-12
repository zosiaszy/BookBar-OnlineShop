// OrderSummary.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL, AUTH_URL } from '../../config';
import OrderItem from '../pages/OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/userReducer';
import { addOrder } from '../../redux/ordersRedux';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user !== null);
  const userData = JSON.parse(localStorage.getItem('user'));
  const [userId] = useState(userData?.id);
  const [cart, setCart] = useState({ products: [] });
  const [status, setStatus] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(userData?.email);
  
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
 

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  
useEffect(() => {
  if (userData) {
    setEmail(userData.email);
    
   
  }
}, [userData]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || { products: [] };
    setCart(storedCart);
  }, []);

  const totalPrice = cart.products.reduce((total, product) => total + product.price * product.count, 0);

 
  const createOrderData = () => {
    return {
      name: name,
      userId: userId,
      email: email,
      address: address,
      paymentMethod: paymentMethod,
      cartProducts: cart.products,
      totalPrice: totalPrice,
      
    };
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

 

    try {
      const orderData = createOrderData();
      console.log('Order Data:', orderData);

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
       
      });

      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      dispatch(addOrder(responseData));
      setStatus('success');
      console.log(dispatch(addOrder(responseData)))
      // Clear cart after successful order submission
      localStorage.removeItem('cart');

      setTimeout(() => {
        navigate('/');
      }, 8000);
    } catch (error) {
      console.error('Error submitting order:', error);
      setStatus('error');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    // Save name to localStorage
    localStorage.setItem('name', e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Save email to localStorage
    localStorage.setItem('email', e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    // Save address to localStorage
    localStorage.setItem('address', e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    // Save payment method to localStorage
    localStorage.setItem('paymentMethod', e.target.value);
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <Alert variant="warning">
          Please <Link to="/sign-in">log in</Link> to proceed with your order.
        </Alert>
      </Container>
    );
  }

  
  return (
    <Container>
      <h1 className="mt-3">Order Summary</h1>
      {status === 'clientError' && (
        <Alert variant="danger">Please fill in all required fields and make sure your cart is not empty.</Alert>
      )}
      {status === 'error' && (
        <Alert variant="danger">There was an error processing your order. Please try again later.</Alert>
      )}
      {status === 'success' && (
        <Alert variant="success">Your order has been successfully submitted.</Alert>
      )}
      {cart.products.length === 0 && (
        <div>
          <Alert variant="info">Your cart is empty.</Alert>
          <Link to="/">
            <Button variant="outline-dark">Continue Shopping</Button>
          </Link>
        </div>
      )}
      {cart.products.length !== 0 && (
        <Row>
          <Col lg={6}>
            <h2>Your Cart</h2>
            <ListGroup>
              {cart.products.map((product) => (
                <OrderItem key={product.id} product={product} />
              ))}
            </ListGroup>
            <h5 className="mb-5 text-star">Total Price: ${totalPrice}</h5>
          </Col>
          <Col lg={4}>
            <h2 className="mt-5">Contact Information</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Enter your address"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <option>Credit Card</option>
                  <option>PayPal</option>
                </Form.Control>
              </Form.Group>
              <Button variant="outline-dark" onClick={handleOrderSubmit}>
                Order
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderSummary;
