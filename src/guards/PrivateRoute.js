import React from "react";
import { Route, Redirect } from "react-router-dom";
import constants from '../utils/constants'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = sessionStorage.getItem(constants.CURRENT_TOKEN_KEY);

  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuth ? <Component {...routeProps} /> : <Redirect to={'/'} />
      }
    />
  );
};

export default PrivateRoute;
