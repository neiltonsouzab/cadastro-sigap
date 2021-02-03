import { FormHandles } from '@unform/core';
import React, { useRef } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Button from '../../components/Button';
import InputText from '../../components/InputText';

import {
  Container,
  Title,
  SubTitle,
  Form,
  FormTitle,
  BackToSignInLink,
} from './styles';

const ForgotPassword: React.FC = () => {
  const signFormRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Title>SISTEMA DE CADASTRO</Title>
      <SubTitle>SIGAP</SubTitle>

      <Form ref={signFormRef} onSubmit={() => console.log('Submit')}>
        <FormTitle>ESQUECI MINHA SENHA</FormTitle>

        <InputText
          name="email"
          type="email"
          placeholder="EMAIL"
          icon={FaEnvelope}
        />

        <Button label="ENVIAR" />

        <BackToSignInLink to="/">Voltar para Login</BackToSignInLink>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
