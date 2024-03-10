import React, { useState, useEffect } from 'react';
import ProductSummary from './ProductSummary';
import { API_URL } from '../../config';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/store';

const ProductList = () => {
//  const products = useSelector(getAllProducts);



//   return (
//     <div className="container">
//       <div className="row">
//         {products.map(product => (
//           <div key={product.id} className="col-md-4">
//             <ProductSummary
//               title={product.title}
//               image={product.image}
//               rating={product.rating}
//               price={product.price}
             
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default ProductList;
