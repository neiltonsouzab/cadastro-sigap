import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  background: #0086c9;
  height: 80px;
`;

export const Header = styled.header`
  height: 100%;
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const System = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SystemName = styled.h1`
  font-family: 'Roboto Condensed';
  font-weight: bold;
  font-size: 20px;

  color: #fff;
`;

export const SystemAbbrev = styled.h2`
  font-family: 'Roboto Condensed';
  font-weight: bold;
  font-size: 16px;

  color: #fff;
`;

export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const UserName = styled.strong`
  font-family: 'Roboto Condensed';
  font-size: 16px;
  color: #fff;
`;

export const LogoutLink = styled.button`
  margin-top: 8px;

  border: none;
  background: none;

  font-family: 'Roboto Condensed';
  font-weight: bold;
  color: #f98b0c;

  transition: filter 0.5s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Content = styled.main`
  margin: 0 auto;
  margin-top: 40px;
  max-width: 900px;

  display: flex;
  flex-direction: row;

  height: 524px;

  background: #eee;
  border-radius: 10px;
`;

export const Menu = styled.section`
  padding: 16px 24px;

  width: 280px;

  background: #0086c9;
  border-radius: 10px;
`;

export const Body = styled.section`
  flex: 1;

  background: #eee;

  border-radius: 10px;
`;

export const MenuItems = styled.ul`
  list-style: none;
`;

export const MenuItem = styled.li`
  display: flex;
  flex-direction: row;

  cursor: pointer;

  & + li {
    margin-top: 10px;
  }

  span {
    margin-left: 8px;

    font-family: 'Roboto Condensed';
    font-weight: bold;
    font-size: 16px;
    color: #fff;
  }

  &:hover {
    svg,
    span {
      color: #f98b0c !important;
    }
  }
`;

export const Divisor = styled.div`
  margin: 16px 0;

  flex: 1;
  height: 1px;
  background: #006699;
`;

export const UgsContainer = styled.div``;

export const UgsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-family: 'Roboto Condensed';
    font-weight: bold;
    font-size: 14px;

    color: #c9c9c0;
  }
`;

export const UgsList = styled.ul`
  list-style: none;

  margin-top: 16px;
`;

interface UgItemProps {
  selected: boolean;
}

export const UgItem = styled.li<UgItemProps>`
  font-family: 'Roboto Condensed';
  font-weight: bold;
  font-size: 14px;

  color: ${(props) => (props.selected ? '#f98b0c' : '#ffff')};
  cursor: pointer;

  transition: color 0.3s;

  & + li {
    margin-top: 8px;
  }

  &:hover {
    color: #f98b0c;
  }
`;

export const CheckAll = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface CheckProps {
  checked: boolean;
}

export const Check = styled.div<CheckProps>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.checked ? '#f98b0c' : '#EEE')};
  border-radius: 4px;
  cursor: pointer;
`;

export const CheckLabel = styled.span`
  margin-left: 8px;

  font-family: 'Roboto Condensed';
  font-size: 14px;
  color: #fff;
`;
