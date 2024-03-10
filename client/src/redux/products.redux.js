import { API_URL } from '../config';

// productsRedux.js

// selectors
export const getAllProducts = (state) => state.products;
export const getProductById = (state, productId) =>
  state.products.find((product) => product.id === productId) || null;

// actions
const createActionName = (actionName) => `app/products/${actionName}`;
const CREATE_PRODUCT = createActionName('CREATE_PRODUCT');
const DELETE_PRODUCT = createActionName('DELETE_PRODUCT');
const EDIT_PRODUCT = createActionName('EDIT_PRODUCT');
const UPDATE_PRODUCTS = createActionName('UPDATE_PRODUCTS');

// action creators
export const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  payload: product,
});
export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});
export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});
export const updateProducts = (updatedProductData) => ({
  type: UPDATE_PRODUCTS,
  payload: { products: updatedProductData },
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      dispatch(updateProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return [...statePart, action.payload];
    case DELETE_PRODUCT:
      return statePart.filter((product) => product.id !== action.payload);
    case EDIT_PRODUCT:
      return statePart.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
    case UPDATE_PRODUCTS:
      return [...action.payload.products];
    default:
      return statePart;
  }
};

export default productsReducer;