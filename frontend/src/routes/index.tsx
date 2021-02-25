import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import UserList from '../pages/User/List';
import UserCreate from '../pages/User/Create';
import UserShow from '../pages/User/Show';

import UgRegisterList from '../pages/Ug/Register/List';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route isPrivate={false} path="/" exact component={SignIn} />

      <Route isPrivate exact path="/users" component={UserList} />

      <Route isPrivate path="/users/create" component={UserCreate} />

      <Route isPrivate path="/users/:id" component={UserShow} />

      <Route isPrivate exact path="/ugs/registers" component={UgRegisterList} />
    </Switch>
  );
};

export default Routes;
