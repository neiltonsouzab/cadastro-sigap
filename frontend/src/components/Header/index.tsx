import React, { useCallback } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Icon,
  AvatarGroup,
} from '@chakra-ui/react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Flex
      as="header"
      h="20"
      bgColor="white"
      px="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" w="100" mr="8">
        <AvatarGroup>
          <Avatar icon={<FaUser color="#fff" />} bg="blue.500" />
        </AvatarGroup>

        <Box ml="4">
          <Text fontWeight="medium">
            {user.name
              .toLocaleLowerCase()
              .replace(/\b(\w)/g, (s) => s.toUpperCase())}
          </Text>
          <Text color="gray.500" fontSize="small">
            {user.email}
          </Text>
        </Box>
      </Flex>

      <Button
        rounded="full"
        background="transparent"
        _hover={{
          backgroundColor: 'gray.50',
        }}
        onClick={handleSignOut}
      >
        <Icon color="blue.500" as={FaSignOutAlt} />
      </Button>
    </Flex>
  );
};

export default Header;
