import React, {ReactElement, createContext, useEffect, useState } from 'react';
import { AuthContextData, User } from '../Interfaces';
import * as auth from '../Services/auth';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: {
    children: ReactElement;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<string>('Home');

  useEffect(() => {
    async function loadStorageData() {
      setLoading(true);
      const storagedUser = localStorage.getItem('@RNAuth:user');
      if (storagedUser)
        setUser(JSON.parse(storagedUser));

      const current = localStorage.getItem('@RNAuth:currentScreen');
      if (current)
        setCurrentScreen(current);

      setLoading(false);
    }
    
    if (!user) {
      loadStorageData();
    }
  }, [user]);

  async function singIn(login: string, password: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      //setLoading(true);
      const response = await auth.singIn(login, password);
      if (response !== undefined) {
        setUser(response);
        localStorage.setItem('@RNAuth:user', JSON.stringify(user));
        //setLoading(false);
        resolve(true);
      } else {
        //setLoading(false);
        resolve(false);
      }
    });
  }

  async function createUser(login: string, password: string, name: string): Promise<string> {
    return new Promise(async (resolve) => {
      setLoading(true);
      const response = await auth.createUser(login, password, name);
      resolve(response);
      setLoading(false);
    });
  }

  async function updateUser(id: number, login: string | null, password: string | null, name: string | null): Promise<string> {
    return new Promise(async (resolve) => {
      login = login == null ? (user as User).email : login;
      password = password == null ? (user as User).password : password;
      name = name == null ? (user as User).name : name;

      setLoading(true);
      const response = await auth.updateUser(
        id,
        login,
        password,
        name);

      if (response === 'O usuário foi modificado com sucesso') {
        var newUser = {
          id: user ? user.id : 0, 
          email: login,
          name: name,
          password: password
        }

        setUser(newUser);

        localStorage.clear();
        localStorage.setItem('@RNAuth:user', JSON.stringify(newUser));
      }
      setLoading(false);
      resolve(response);
    });
  }

  function singOut(): Promise<string> {
    return new Promise(async (resolve) => {
      setLoading(true);
      localStorage.clear();
      setUser(null);
      setCurrentScreen('Home');
      setLoading(false);
      resolve('Sucesso!');
    });
  }

  function selectScreen(eleme: string) {
    setLoading(true);
    setCurrentScreen(eleme);
    localStorage.setItem('@RNAuth:currentScreen', eleme);
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, loading, currentScreen, singIn, createUser, updateUser, singOut, selectScreen}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;