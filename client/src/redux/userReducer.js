//selectors

import { AUTH_URL, API_URL } from "../config";

//actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

//action creators
export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'GET',
        credentials: 'include',
      });
      const user = await response.json();
      dispatch(logIn(user));
    } catch (error) {
      console.log(error);
    }
  };
};

const userReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
};

export default userReducer;