import { Flex, Image } from '@chakra-ui/react';
import React from 'react';

import cpa from '../../../assets/cpa.jpg';
import logo from '../../../assets/logo.svg';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Flex as="main" w="100vw" h="100vh">
      <Flex
        as="section"
        flex={1}
        direction="column"
        alignItems="center"
        p="0 24px"
      >
        <Image src={logo} width={160} height={40} />

        {children}
      </Flex>

      <Flex
        as="section"
        w="50%"
        background={`url(${cpa}) center center`}
        boxShadow="inset 100px 0px 50px #F7FAFC"
      />
    </Flex>
  );
};

export default AuthLayout;
