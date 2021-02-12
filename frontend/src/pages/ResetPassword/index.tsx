import React from 'react';
import { Button, Flex, Heading, Link, VStack } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';

import InputText from '../../components/InputText';

const ResetPassword: React.FC = () => {
  return (
    <Flex
      as="form"
      w="100%"
      bg="white"
      flexDir="column"
      maxWidth={400}
      padding={8}
      borderRadius={4}
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
    >
      <Heading size="md" color="blue.700">
        Alterar senha
      </Heading>

      <VStack spacing={4} marginTop={8}>
        <InputText
          name="password"
          type="password"
          placeholder="Senha"
          icon={FaLock}
        />
        <InputText
          name="confirm_password"
          type="password"
          placeholder="Confirmação de senha"
          icon={FaLock}
        />
      </VStack>

      <Button
        size="lg"
        fontSize="md"
        color="white"
        type="submit"
        marginTop={4}
        colorScheme="blue"
      >
        SALVAR
      </Button>

      <Link
        href="/forgot-password"
        alignSelf="center"
        mt={4}
        fontSize="sm"
        color="blue.500"
        _hover={{ color: 'blue.700' }}
        _active={{ color: 'blue.800' }}
      >
        Voltar para login
      </Link>
    </Flex>
  );
};

export default ResetPassword;
