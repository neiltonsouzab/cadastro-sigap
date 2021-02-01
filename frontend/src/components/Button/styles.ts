import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 38px;
  margin-top: 12px;

  font-family: 'Roboto Condensed';
  font-size: 16px;
  font-weight: bold;

  color: #fff;
  background: #f98b0c;
  border: none;
  border-radius: 10px;

  transition: filter 0.5s;

  &:hover {
    filter: brightness(0.9);
  }
`;
