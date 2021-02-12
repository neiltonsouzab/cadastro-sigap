import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Routes from './routes';
import AppProvider from './hooks';

import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <Router>
      <ChakraProvider resetCSS theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ChakraProvider>
    </Router>
  );
};

export default App;
