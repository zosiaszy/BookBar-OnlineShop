import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';

import initialState from './initialState';
import usersReducer from './userReducer';
import productsReducer from './products.redux';
import ordersReducer from './ordersRedux';

// combine reducers
const subreducers = {
  products: productsReducer,
  user: usersReducer,
  orders: ordersReducer
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default store;