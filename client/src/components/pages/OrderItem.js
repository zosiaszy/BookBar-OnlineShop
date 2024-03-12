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
        <p className="mt-2">Price per item: ${product.price}</p>
        <p>Quantity: {count}</p>
        <p>Total for this item: ${product.price * count}</p>
       
      </div>
    </div>
  );
};

export default OrderItem;