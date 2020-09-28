import http from './base-http-service';
import constants from '../utils/constants'

let tokenLocal = sessionStorage.getItem(constants.CURRENT_TOKEN_KEY);

const authenticate = async user => {
  try {
    const response = await http.post('/admins/signin', user);
    if (response && response.status && response.status === 200) {
      tokenLocal = await response.data.jwt;
      sessionStorage.setItem(constants.CURRENT_TOKEN_KEY, tokenLocal);
      return response.data
    }
  } catch (error) {
    throw error;
  }
};
const getRefreshToken = async () => {
  const config = { headers: { Authorization: `Bearer ${sessionStorage.getItem(constants.CURRENT_TOKEN_KEY)}` } };
  try {
    const response = await http.get('/admins/session',config)
    if (response.status === 200) {
      tokenLocal = await response.data.jwt;
      sessionStorage.setItem(constants.CURRENT_TOKEN_KEY, tokenLocal);

      const newData = {
        id: response.data.id,
        name: response.data.name,
        role: response.data.role,
        roleDescription: response.data.roleDescription
      };
      localStorage.setItem(constants.CURRENT_USER_KEY, JSON.stringify(newData));
      return newData
    } else if(response.status === 401){
      logout()
    }
  } catch (error) {
    logout()
    return error;
  }
};

const recover = async user => {
  try {
    const response = await http.post('/admins/resetPassword', user);

      return response.status
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  tokenLocal = null;
  localStorage.removeItem(constants.CURRENT_USER_KEY);
  localStorage.removeItem(constants.CURRENT_COOKIES_KEY);
  sessionStorage.removeItem(constants.CURRENT_TOKEN_KEY);
  sessionStorage.removeItem(constants.CURRENT_MENU_OPTION_KEY);
  window.location.reload();
};

export default {
  authenticate,
  getRefreshToken,
  recover,
  logout
}