import React, { useContext } from 'react';

import { createContext, useCallback, useState } from 'react';

import api from '../services/api';

export interface Ug {
  id: string;
  code: string;
  name: string;
  short_name: string;
}

interface User {
  id: number;
  cpf: string;
  name: string;
  nickname: string;
  email: string;
  ugs: Array<Ug>;
}

interface SignInCredentials {
  cpf: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
  selectedsUgs: Ug[];
}

interface AuthContextData {
  user: User;
  selectedsUgs: Ug[];
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  selectToggleUgs(ug: Ug): void;
  selectToggleAllUgs(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@cadastro-sigap:token');
    const user = localStorage.getItem('@cadastro-sigap:user');
    const selectedsUgs = localStorage.getItem('@cadastro-sigap:selecteds_ugs');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
        selectedsUgs: selectedsUgs ? JSON.parse(selectedsUgs) : [],
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ cpf, password }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      cpf,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@cadastro-sigap:token', token);
    localStorage.setItem('@cadastro-sigap:user', JSON.stringify(user));
    localStorage.setItem('@cadastro-sigap:selecteds_ugs', JSON.stringify([]));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      user,
      token,
      selectedsUgs: [],
    });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@cadastro-sigap:token');
    localStorage.removeItem('@cadastro-sigap:user');

    setData({} as AuthState);
  }, []);

  const selectToggleUgs = useCallback(
    (ug: Ug) => {
      const ugExist = data.selectedsUgs.find((findUg) => findUg.id === ug.id);
      let ugs = data.selectedsUgs;

      if (ugExist) {
        ugs = ugs.filter((ugFilter) => ugFilter.id !== ugExist.id);
      } else {
        ugs.push(ug);
      }

      localStorage.setItem(
        '@cadastro-sigap:selecteds_ugs',
        JSON.stringify(ugs),
      );

      setData((state) => ({
        ...state,
        selectedsUgs: ugs,
      }));
    },
    [data],
  );

  const selectToggleAllUgs = useCallback(() => {
    const { user, selectedsUgs } = data;

    if (user.ugs.length === selectedsUgs.length) {
      setData((state) => ({
        ...state,
        selectedsUgs: [],
      }));

      localStorage.setItem('@cadastro-sigap:selecteds_ugs', JSON.stringify([]));
    } else {
      setData((state) => ({
        ...state,
        selectedsUgs: state.user.ugs,
      }));

      localStorage.setItem(
        '@cadastro-sigap:selecteds_ugs',
        JSON.stringify(user.ugs),
      );
    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        selectedsUgs: data.selectedsUgs,
        signIn,
        signOut,
        selectToggleUgs,
        selectToggleAllUgs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
