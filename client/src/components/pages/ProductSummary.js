import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../config';
import styles from './ProductSummary.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';





const ProductSummary = ({ id}) => {
  
  const products = useSelector(state => state.products);
  const product = products.find(product => product.id === id);

  

  return (
    
            <Card className=" flex-fill align-items-center justify-content-center">
              <Card.Img
                className={styles.image}
                src={`${IMAGES_URL}/${product.image}`}
                alt={product.title}
              />
              <Card.Body className="card border-0 flex-fill d-flex align-items-center justify-content-center p-1">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: {product.price} $ </Card.Text>
                <Card.Text className='star'>
               
                <FontAwesomeIcon icon={faStar} className="fa-star mx-1"/>
                {product.rating}/5
                </Card.Text>
            
                <Link to={`/product/${product.id}`}>
                  <Button variant="outline-dark">Read more</Button>
                </Link>

             
              </Card.Body>
            </Card>
        
  );
};
   
 



export default ProductSummary;