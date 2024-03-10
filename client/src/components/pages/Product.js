import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../config';
import {Card} from 'react-bootstrap';

import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Product = () => {
  const { id } = useParams();
  const products = useSelector(state => state.products);
  const product = products.find(product => product.id === id);

  const [productCount, setProductCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || { products: [] };
    const existingProductIndex = cart.products.findIndex(
      item => item.productId === product.id
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].count += productCount;
    } else {
      cart.products.push({
        productId: product.id,
        count: productCount,
        price: product.price
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsModalOpen(true);
  };

  const incrementProductCount = () => {
    setProductCount(productCount + 1);
  };

  const decrementProductCount = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Added to cart</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Link to="/cart" onClick={closeModal}>
            <Button variant="outline-warning">Go to Cart</Button>
          </Link>
          <Link to="/" onClick={closeModal}>
            <Button variant="secondary" onClick={closeModal}>
              Continue shopping
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div>
              <h2 className="text-center py-4">Product details</h2>
              <Card.Img
               
                src={`${IMAGES_URL}/${product.image}`}
                alt={product.title}
              />
              <div>
                <div>
                  <h3>{product.title}</h3>
                  <h3>{product.price} $ </h3>
                  <h4> {product.description}</h4>
                  
                  <div className="d-flex align-items-center justify-content-center">
                    <Button variant="secondary" onClick={decrementProductCount}>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <p className="mx-3">{productCount}</p>
                    <Button variant="secondary" onClick={incrementProductCount}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                  <div className="text-center mt-4">
                    <Button variant="secondary" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
