import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductSummary from '../pages/ProductSummary';

const Products = () => {
  const products = useSelector((state) => state.products);

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={3} className="mt-5 d-flex">  
            <ProductSummary
              id={product.id}
              title={product.title}
              price={product.price}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
