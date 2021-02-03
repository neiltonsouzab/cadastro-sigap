import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  margin-top: 10px;
  height: 38px;

  display: flex;
  flex-direction: row;
  align-items: center;

  background: #006699;
  border-radius: 10px;

  input {
    flex: 1;
    padding: 0 16px;

    background: none;
    border: none;
    font-family: 'Roboto Condensed';
    font-size: 16px;
    font-weight: bold;
    color: #fff;

    &::placeholder {
      color: #c9c9c0;
    }
  }

  svg {
    margin-right: 10px;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: 4px;

  font-family: 'Roboto Condensed';
  font-size: 14px;
  font-weight: bold;

  color: #ff8266;
`;
