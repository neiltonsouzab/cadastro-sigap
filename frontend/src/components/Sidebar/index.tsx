import { Flex, Link, Text, VStack } from '@chakra-ui/react';

import { FaUsers, FaUniversity, FaListAlt } from 'react-icons/fa';

import React from 'react';

// import { Container } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Flex
      as="aside"
      direction="column"
      width={72}
      paddingTop={8}
      borderRadius={4}
      backgroundColor="white"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>
          MENU
        </Text>
        <Link
          display="flex"
          alignItems="center"
          color="blue.500"
          py="1"
          pl={8}
          borderLeft="3px solid"
        >
          <FaUsers size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Usuários
          </Text>
        </Link>
        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          color="gray.500"
          borderLeft="3px solid transparent"
        >
          <FaUniversity size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Unidades gestoras
          </Text>
        </Link>
        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          color="gray.500"
          borderLeft="3px solid transparent"
        >
          <FaListAlt size="20" />
          <Text ml="4" fontSize="medium" fontWeight="medium">
            Registros de UGs
          </Text>
        </Link>
      </VStack>
      <VStack spacing="4" pr="8" pb="8" mt={8} alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>
          UGS DISPONÍVEIS
        </Text>
        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          color="gray.500"
          borderLeft="3px solid transparent"
        >
          <Text fontSize="medium" fontWeight="medium">
            140001 - SEFIN
          </Text>
        </Link>

        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          color="gray.500"
          borderLeft="3px solid transparent"
        >
          <Text fontSize="medium" fontWeight="medium">
            010001 - ALE
          </Text>
        </Link>

        <Link
          display="flex"
          alignItems="center"
          py="1"
          pl={8}
          color="gray.500"
          borderLeft="3px solid transparent"
        >
          <Text fontSize="medium" fontWeight="medium">
            020001 - TJ
          </Text>
        </Link>
      </VStack>
    </Flex>
  );
};

export default Sidebar;
