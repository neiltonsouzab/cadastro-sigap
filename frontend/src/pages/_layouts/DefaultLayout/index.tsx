import React, { useCallback, useState } from 'react';
import { FaUsers, FaUniversity, FaCheck } from 'react-icons/fa';

import { useAuth, Ug } from '../../../hooks/auth';

import {
  Container,
  Header,
  System,
  SystemName,
  SystemAbbrev,
  UserContent,
  UserName,
  LogoutLink,
  Content,
  Menu,
  Body,
  MenuItems,
  MenuItem,
  Divisor,
  UgsContainer,
  UgsHeader,
  UgsList,
  UgItem,
  CheckAll,
  Check,
  CheckLabel,
} from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  const {
    user,
    signOut,
    selectedsUgs,
    selectToggleUgs,
    selectToggleAllUgs,
  } = useAuth();

  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleSelectAllUgs = useCallback(() => {
    setIsAllSelected((state) => !state);
    selectToggleAllUgs();
  }, [selectToggleAllUgs]);

  const handleSelectUg = useCallback(
    (ug: Ug) => {
      selectToggleUgs(ug);
    },
    [selectToggleUgs],
  );

  return (
    <Container>
      <Header>
        <System>
          <SystemName>SISTEMA DE CADASTRO</SystemName>
          <SystemAbbrev>SIGAP</SystemAbbrev>
        </System>

        <UserContent>
          <UserName>Olá {user.nickname}</UserName>

          <LogoutLink onClick={handleSignOut}>Sair</LogoutLink>
        </UserContent>
      </Header>

      <Content>
        <Menu>
          <MenuItems>
            <MenuItem>
              <FaUsers size={16} color="#FFF" />
              <span>Usuários</span>
            </MenuItem>

            <MenuItem>
              <FaUniversity size={16} color="#FFF" />
              <span>Unidades Gestoras</span>
            </MenuItem>
          </MenuItems>

          <Divisor />

          <UgsContainer>
            <UgsHeader>
              <h3>UGS DISPONÍVEIS</h3>

              <CheckAll>
                <Check checked={isAllSelected} onClick={handleSelectAllUgs}>
                  {isAllSelected && <FaCheck size={10} color="#FFFF" />}
                </Check>
                <CheckLabel>Todas</CheckLabel>
              </CheckAll>
            </UgsHeader>

            <UgsList>
              {user.ugs.map((ug: Ug) => {
                console.log();

                return (
                  <UgItem
                    key={ug.id}
                    selected={
                      !!selectedsUgs.find((findUg) => findUg.id === ug.id)
                    }
                    onClick={() => handleSelectUg(ug)}
                  >
                    {ug.code} - {ug.name}
                  </UgItem>
                );
              })}
            </UgsList>
          </UgsContainer>
        </Menu>
        <Body>{children}</Body>
      </Content>
    </Container>
  );
};

export default DefaultLayout;
