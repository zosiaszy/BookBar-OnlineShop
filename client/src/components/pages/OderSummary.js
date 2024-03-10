import React, { useState, useEffect } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Alert,
  Modal,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../../config';
import OrderItem from '../pages/OrderItem';

const OrderSummary = () => {
  const location = useLocation();
  const isLoggedIn = location.state && location.state.isLoggedIn;
  const [cart, setCart] = useState({ products: [] });
  const [status, setStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [name, setName] = useState('');
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?.id;
  const [email, setEmail] = useState(userData?.email);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {
      products: [],
    };
    if (!isLoggedIn || !userData) {
      setStatus('loginError');
    } else {
      setStatus(null);
    }
    setCart(storedCart);
  }, [isLoggedIn, userData]);

  const totalPrice = cart.products.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

const handleOrderSubmit = (e) => {
  e.preventDefault();
  if (!isLoggedIn || !userData || !name || !email || !address || !paymentMethod || cart.products.length === 0) {
    setStatus('clientError');
    return;
  }
  const orderData = {
    name: name,
    userId: userId,
    email: email,
    address: address,
    paymentMethod: paymentMethod,
    cartProducts: cart.products.map(product => ({ id: product.id, count: product.count })),
    totalPrice: totalPrice,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  };
  setStatus('loading');

  fetch(`${API_URL}/orders`, options)
    .then((res) => {
      if (res.status === 201) {
        setStatus('success');
        localStorage.removeItem('cart');
        setCart({ products: [] });
      } else if (res.status === 400) {
        setStatus('clientError');
      } else if(res.status === 401){
        setStatus('loginError');
      } else {
        setStatus('serverError');
      }
    })
    .catch((err) => {
      console.log(err);
      setStatus('serverError');
    });
};

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <h1>Order Summary</h1>

      {status === 'loginError' && status !== null && !isLoggedIn && (
        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>You need to be logged in to order</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Link to="/sign-in" onClick={closeModal}>
              <Button variant="outline-warning">Sign In</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          Please fill in all required fields and make sure your cart is not empty.
        </Alert>
      )}
      {status === 'serverError' && (
        <Alert variant="danger">
          Something went wrong. Please try again later.
        </Alert>
      )}
      {status === 'loginError' && (
        <Alert variant="warning">
          You need to be logged in to order.
        </Alert>
      )}
      {status === 'success' && (
        <div>
          <Alert variant="success">
            Your order has been successfully submitted.
          </Alert>
          <Link to="/">
            <Button variant="outline-dark">Continue Shopping</Button>
          </Link>
        </div>
      )}
      {cart.products.length === 0 && status !== 'success' && (
        <div>
          <Alert variant="info">Your cart is empty.</Alert>
          <Link to="/">
            <Button variant="outline-dark">Continue Shopping</Button>
          </Link>
        </div>
      )}
      {status !== 'success' && cart.products.length !== 0 && (
        <Row>
          <Col lg={8}>
            <h2>Your Cart</h2>
            <ListGroup>
              {cart.products.map((product) => (
                <OrderItem key={product.id} product={product} />
              ))}
            </ListGroup>
            <h5 className="my-5 text-end">Total Price: ${totalPrice}</h5>
          </Col>
          <Col lg={4}>
            <h2>Contact Information</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
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
