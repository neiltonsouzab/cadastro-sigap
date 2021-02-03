import styled from 'styled-components';

import cpaImg from '../../../assets/cpa.jpg';

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
