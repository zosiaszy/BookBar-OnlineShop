import { AUTH_URL } from '../../config';
// import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/userReducer';
export const checkLoggedInUser = async (dispatch) => {
  try {
    const userDataString = localStorage.getItem('user');
    if (!userDataString) {
      console.error('No user data found in localStorage');
      return;
    }

    let userData;
    try {
      userData = JSON.parse(userDataString);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return;
    }

    if (
      userData &&
      userData.email !== undefined &&
      userData.email !== null
    ) {
      dispatch(logIn(userData.email));
    } else {
      const response = await fetch(`${AUTH_URL}/user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const fetchedUserData = await response.json();
        console.log('User data fetched from server:', fetchedUserData);

        if (
          fetchedUserData &&
          fetchedUserData.email !== undefined &&
          fetchedUserData.email !== null
        ) {
          dispatch(logIn(fetchedUserData.email));
          localStorage.setItem('user', JSON.stringify(fetchedUserData));
        }
      }
    }
  } catch (error) {
    console.error('Error while checking logged-in user:', error);
  }
};
