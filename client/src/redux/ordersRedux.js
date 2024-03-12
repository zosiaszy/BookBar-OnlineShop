// actions
const ADD_ORDER = 'app/orders/ADD_ORDER';

// action creators
export const addOrder = (orderData) => ({ type: ADD_ORDER, payload: orderData });

// reducer
const ordersReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_ORDER:
      return action.payload;
    default:
      return statePart;
  }
};



export default ordersReducer;
