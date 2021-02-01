import React, { useRef } from 'react';
import { FaLock } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import InputText from '../../components/InputText';

import {
  Container,
  FormSection,
  BackgroundSection,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

const ResetPassword: React.FC = () => {
  const signFormRef = useRef<FormHandles>(null);

  return (
    <Container>
      <FormSection>
        <Title>SISTEMA DE CADASTRO</Title>
        <SubTitle>SIGAP</SubTitle>

        <Form ref={signFormRef} onSubmit={() => console.log('Submit')}>
          <FormTitle>ALTERAÇÃO DE SENHA</FormTitle>

          <InputText
            name="new_password"
            type="password"
            placeholder="NOVA SENHA"
            icon={FaLock}
          />

          <InputText
            name="password_confirmation"
            type="password"
            placeholder="CONFIRMÇÃO DE SENHA"
            icon={FaLock}
          />

          <Button label="SALVAR" />
        </Form>
      </FormSection>

      <BackgroundSection />
    </Container>
  );
};

export default ResetPassword;
