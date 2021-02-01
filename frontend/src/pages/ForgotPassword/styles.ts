import styled from 'styled-components';
import { Form as FormUnform } from '@unform/web';

import cpaImg from '../../assets/cpa.jpg';

export const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
`;

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1;

  margin-top: 80px;
`;

export const BackgroundSection = styled.section`
  width: 50%;
  background: #000;

  background: url(${cpaImg}) center center no-repeat;
  box-shadow: inset 124px 0px 50px #ffffff;
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

export const BackToSignInLink = styled.a`
  display: block;

  text-decoration: none;
  text-align: center;

  margin-top: 16px;

  font-family: 'Roboto Condensed';
  font-size: 14px;
  font-weight: bold;

  color: #f98b0c;

  &:hover {
    filter: brightness(0.9);
  }
`;
