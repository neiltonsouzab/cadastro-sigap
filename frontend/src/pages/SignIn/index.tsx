import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FaIdCard, FaLock } from 'react-icons/fa';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import InputText from '../../components/InputText';
import InputMask from '../../components/InputMask';

import {
  Container,
  Title,
  SubTitle,
  Form,
  FormTitle,
  ForgotPasswordLink,
} from './styles';

interface SignInFormData {
  cpf: string;
  password: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const signFormRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        signFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          cpf: data.cpf,
          password: data.password,
        });

        history.push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          signFormRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Há algo de errado',
          description:
            'Ocorreu um erro ao fazer login, cheque suas credenciais.',
        });
      }
    },
    [addToast, signIn],
  );

  return (
    <Container>
      <Title>SISTEMA DE CADASTRO</Title>
      <SubTitle>SIGAP</SubTitle>

      <Form ref={signFormRef} onSubmit={handleSubmit}>
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

        <ForgotPasswordLink to="/forgot-password">
          Esqueceu sua senha?
        </ForgotPasswordLink>

        <Button label="ENTRAR" />
      </Form>
    </Container>
  );
};

export default SignIn;
