import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Form as FormUnform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: #006699;
`;

export const SubTitle = styled.h1`
  font-size: 36px;
  color: #006699;
`;

export const Form = styled(FormUnform)`
  margin-top: 64px;
  padding: 0 32px;

  width: 380px;
  height: 220px;

  background: #0086c9;
  border-radius: 10px;
`;

export const FormTitle = styled.h3`
  margin-top: 24px;
  margin-bottom: 24px;

  font-size: 20px;
  text-align: center;

  color: #fff;
`;

export const BackToSignInLink = styled(Link)`
  display: block;

  text-decoration: none;
  text-align: center;

  margin-top: 16px;

  font-family: 'Roboto Condensed';
  font-size: 14px;
  font-weight: bold;

  color: #f98b0c;

  transition: filter 0.5s;

  &:hover {
    filter: brightness(0.9);
  }
`;
