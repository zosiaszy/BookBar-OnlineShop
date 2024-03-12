import { API_URL, AUTH_URL } from '../../config';
import { logIn } from '../../redux/userReducer';

export const checkLoggedInUser = async (dispatch) => {
  try {
    const userDataString = localStorage.getItem('user');

    // Sprawdź, czy dane użytkownika zostały znalezione w localStorage
    if (userDataString) {
      try {
        // Spróbuj sparsować dane użytkownika
        const userData = JSON.parse(userDataString);
        
        // Sprawdź, czy sparsowane dane użytkownika nie są puste
        if (userData && Object.keys(userData).length > 0) {
          dispatch(logIn(userData.email));
 
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      // Jeśli nie znaleziono danych użytkownika w localStorage, pobierz je z serwera
      const response = await fetch(`${AUTH_URL}/user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const fetchedUserData = await response.json();
        console.log('User data fetched from server:', fetchedUserData);

        // Sprawdź, czy otrzymane dane użytkownika nie są puste
        if (fetchedUserData && Object.keys(fetchedUserData).length > 0) {
          dispatch(logIn(fetchedUserData.email));
        
          
          // Zapisz dane użytkownika w localStorage
        
          localStorage.setItem('user', JSON.stringify(fetchedUserData));
        }
      }
    }
  } catch (error) {
    console.error('Error while checking logged-in user:', error);
  }
};
