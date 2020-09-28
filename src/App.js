import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './guards/PrivateRoute';
import {
  Login,
  Dashboard,
  SetPassword
} from './components/index';
import './App.css';

const App = props => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [width, ]);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/password" component={SetPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
