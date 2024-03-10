import React, { useState } from 'react';
import { getProductById } from '../../redux/products.redux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../config';



const OrderItem = ({ product }) => {
  const [count, setCount] = useState(product.count);

  const productData = useSelector((state) => getProductById(state, product.productId));

  return (
    <div >
      <p>{product.title}</p>
      <div >
        {productData && (
          <img
            
            src={`${IMAGES_URL}/${productData.image}`}
            alt={productData.title}
          ></img>
        )}
        <p className="col-md-3">Price per item: ${product.price}</p>
        <p className="col-md-2">Quantity: {count}</p>
        <p className="col-md-3">Total for this item: ${product.price * count}</p>
        {product.comment && <p >Comment: {product.comment}</p>}
      </div>
    </div>
  );
};

export default OrderItem;