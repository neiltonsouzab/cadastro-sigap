import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Box>
      <Header />

      <Flex as="main" direction="row" marginY={6} marginX={6}>
        <Sidebar />

        {children}
      </Flex>
    </Box>
  );
};

export default DefaultLayout;
