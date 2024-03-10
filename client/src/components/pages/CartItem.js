import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getProductById } from '../../redux/products.redux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../config';



const CartItem = ({ product, updateCart, removeProduct }) => {
  const [count, setCount] = useState(product.count);
  const [comment, setComment] = useState(product.comment);

  const productData = useSelector((state) => getProductById(state, product.productId));
  const handleIncrement = () => {
    setCount(count + 1);
    updateCart(product.id, count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      updateCart(product.id, count - 1);
    }
  };

  const handleRemove = () => {
    removeProduct(product.id);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    product.comment = event.target.value;

    const updatedCart = JSON.parse(localStorage.getItem('cart')) || {
      products: [],
    };
    const productIndex = updatedCart.products.findIndex(
      (item) => item.id === product.id,
    );
    if (productIndex !== -1) {
      updatedCart.products[productIndex].comment = event.target.value;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <div >
      <p>{product.title}</p>
      <div className="row">
        <div>
          {productData && (
            <img
           
              src={`${IMAGES_URL}/${productData.image}`}
              alt={productData.title}
            ></img>
          )}
        </div>
        <div >
          <p >Price per item: ${product.price}</p>
          <p>Total for this item: ${product.price * count}</p>
        </div>
        <div >
          <Button
     
            variant="dark"
            onClick={handleDecrement}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <p >
            {count}
          </p>
          <Button
          
            variant="dark"
            onClick={handleIncrement}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button
    
            variant="outline-dark"
            onClick={handleRemove}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
        <Form.Group className="mt-2">
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default CartItem;