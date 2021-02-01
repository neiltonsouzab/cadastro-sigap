import { FormHandles } from '@unform/core';
import React, { useRef } from 'react';
import { FaIdCard, FaLock, FaPhone } from 'react-icons/fa';

import Button from '../../components/Button';
import InputText from '../../components/InputText';
import InputMask from '../../components/InputMask';

import {
  Container,
  FormSection,
  BackgroundSection,
  Title,
  SubTitle,
  Form,
  FormTitle,
  ForgotPasswordLink,
} from './styles';

const SignIn: React.FC = () => {
  const signFormRef = useRef<FormHandles>(null);

  return (
    <Container>
      <FormSection>
        <Title>SISTEMA DE CADASTRO</Title>
        <SubTitle>SIGAP</SubTitle>

        <Form ref={signFormRef} onSubmit={() => console.log('Submit')}>
          <FormTitle>FAÇA LOGIN</FormTitle>

          <InputMask
            name="cpf"
            placeholder="CPF"
            mask="999.999.999-99"
            icon={FaIdCard}
          />

          <InputText
            name="password"
            type="password"
            placeholder="SENHA"
            icon={FaLock}
          />

          <ForgotPasswordLink href="#">Esqueceu sua senha?</ForgotPasswordLink>

          <Button label="ENTRAR" />
        </Form>
      </FormSection>

      <BackgroundSection />
    </Container>
  );
};

export default SignIn;
