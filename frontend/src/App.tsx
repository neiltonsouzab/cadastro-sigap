import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ResetPassword />
    </>
  );
};

export default App;
