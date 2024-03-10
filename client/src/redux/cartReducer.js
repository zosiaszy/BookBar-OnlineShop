//selectors
export const getAllCartProducts = ({ cart }) => cart.products;
export const getDeliveryFee = ({ cart }) => cart.deliveryFee;
// actions
const createActionName = (actionName) => `app/cart/${actionName}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const UPDATE_IN_CART = createActionName('UPDATE_IN_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CLEAR_CART = createActionName('CLEAR_CART');

//action creators
export const addToCart = (payload) => ({ payload, type: ADD_TO_CART });
export const updateInCart = (payload) => ({ payload, type: UPDATE_IN_CART });
export const clearCart = (payload) => ({ payload, type: CLEAR_CART });
export const removeFromCart = (payload) => ({
  payload,
  type: REMOVE_FROM_CART,
});
export const getLocalCartData = () => {
  let localCartData = localStorage.getItem('cart');
  if (localCartData) {
    return JSON.parse(localCartData);
  } else {
    return [];
  }
};

const cartReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (
        statePart.products.find((product) => product.id === action.payload.id)
      ) {
        return {
          ...statePart,
          products: statePart.products.map((product) =>
            product.id === action.payload.id
              ? {
                  ...product,
                  quantity: product.quantity + action.payload.quantity,
                  comment: product.comment,
                }
              : product,
          ),
        };
      } else {
        return {
          ...statePart,
          products: [
            ...statePart.products,
            {
              ...action.payload,
              quantity: action.payload.quantity,
              comment: '',
            },
          ],
        };
      }
    }
    case REMOVE_FROM_CART: {
      return {
        ...statePart,
        products: statePart.products.filter(
          (product) => product.id !== action.payload,
        ),
      };
    }
    case UPDATE_IN_CART: {
      return {
        ...statePart,
        products: statePart.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload }
            : product,
        ),
      };
    }
    case CLEAR_CART: {
      return {
        ...statePart,
        products: [],
      };
    }
    default:
      return statePart;
  }
};

export default cartReducer;