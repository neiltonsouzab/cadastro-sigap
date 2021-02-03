import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route isPrivate={false} path="/" exact component={SignIn} />
    <Route
      isPrivate={false}
      path="/forgot-password"
      component={ForgotPassword}
    />
    <Route isPrivate={false} path="/reset-password" component={ResetPassword} />

    <Route isPrivate path="/home" component={Home} />
  </Switch>
);

export default Routes;
