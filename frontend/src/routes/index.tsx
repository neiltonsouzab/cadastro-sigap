import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
// import { Container } from './styles';

import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import UserList from '../pages/User/List';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route isPrivate={false} path="/" exact component={SignIn} />
      <Route
        isPrivate={false}
        path="/forgot-password"
        component={ForgotPassword}
      />
      <Route
        isPrivate={false}
        path="/reset-password"
        component={ResetPassword}
      />

      <Route isPrivate exact path="/users" component={UserList} />
    </Switch>
  );
};

export default Routes;
