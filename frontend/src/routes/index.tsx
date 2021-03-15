import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import UserList from '../pages/User/List';
import UserCreate from '../pages/User/Create';
import UserShow from '../pages/User/Show';

import UgRegisterList from '../pages/Ug/Register/List';
import UgRegisterCreate from '../pages/Ug/Register/Create';
import UgRegisterShow from '../pages/Ug/Register/Show';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route isPrivate={false} path="/" exact component={SignIn} />

      <Route isPrivate exact path="/users" component={UserList} />

      <Route isPrivate path="/users/create" component={UserCreate} />

      <Route isPrivate path="/users/:id" component={UserShow} />

      <Route
        isPrivate
        exact
        path="/ugs/registrations"
        component={UgRegisterList}
      />

      <Route
        isPrivate
        path="/ugs/registrations/create"
        component={UgRegisterCreate}
      />

      <Route
        isPrivate
        path="/ugs/registrations/:id"
        component={UgRegisterShow}
      />
    </Switch>
  );
};

export default Routes;
