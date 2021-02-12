import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Flex, Heading, Link, VStack } from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import InputText from '../../components/InputText';
import InputMask from '../../components/InputMask';

const validationSchema = Yup.object({
  cpf: Yup.string().required('CPF obrigatório.'),
  password: Yup.string().required('Senha obrigatória.'),
});

const SignIn: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      cpf: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (data) => {
      await signIn({
        cpf: data.cpf,
        password: data.password,
      });

      history.push('/users');
    },
  });

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
      onSubmit={(event) => {
        event.preventDefault();
        formik.handleSubmit();
      }}
    >
      <Heading size="md" color="blue.700">
        Fazer login
      </Heading>

      <VStack spacing={4} marginTop={8}>
        <InputMask
          mask="999.999.999-99"
          id="cpf"
          name="cpf"
          placeholder="CPF"
          icon={FaUserAlt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cpf}
          touched={formik.touched.cpf}
          errors={formik.errors.cpf}
        />
        <InputText
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          icon={FaLock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          touched={formik.touched.password}
          errors={formik.errors.password}
        />
      </VStack>

      <Button
        size="lg"
        fontSize="md"
        color="white"
        marginTop={4}
        colorScheme="blue"
        type="submit"
        isLoading={formik.isSubmitting}
      >
        ENTRAR
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
        Esqueceu sua senha?
      </Link>
    </Flex>
  );
};

export default SignIn;
