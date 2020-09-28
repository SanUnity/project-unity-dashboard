import React, { useEffect, useState } from 'react';
import constants from '../utils/constants';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentToken, setCurrentToken] = useState(null);
  const [cookies, setCookies] = useState(null)
  const [notify, setNotify] = useState({
    message: '',
    state: false
  });

  useEffect(() => {
    setCurrentToken(sessionStorage.getItem(constants.CURRENT_TOKEN_KEY));
    setCookies(localStorage.getItem(constants.CURRENT_COOKIES_KEY));
    
  }, [setCurrentToken,  setCookies]);

  return (
    <AuthContext.Provider
      value={{
        notify,
        setNotify,
        currentToken,
        setCurrentToken,
        cookies,
        setCookies
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};