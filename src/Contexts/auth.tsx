import React, {ReactElement, createContext, useEffect, useState } from 'react';
import { AuthContextData, User } from '../Interfaces';
import * as auth from '../Services/auth';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: {
    children: ReactElement;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      const storagedUser = localStorage.getItem('@RNAuth:user');
      if (storagedUser)
        setUser(JSON.parse(storagedUser));

      setLoading(false);
    }
  }, [user]);

  async function singIn(email: string, password: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      setLoading(true);
      const response = await auth.singIn(email, password);
      if (response !== undefined) {
        setUser(response);
        localStorage.setItem('@RNAuth:user', JSON.stringify(response));
        resolve(true);
      } else {
        resolve(false);
      }
      setLoading(false);
    });
  }

  async function createUser(email: string, password: string, name: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      setLoading(true);
      email = email ? email : (user as User).email;
      password = password ? password : (user as User).password;
      name = name ? name : (user as User).name;

      const response = await auth.createUser(email, password, name);
      
      setLoading(false);
      resolve(response);      
    });
  }

  async function updateUser(id: number, email: string, password: string, name: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      setLoading(true);
      const response = await auth.updateUser(
        id,
        email,
        password,
        name);

      if (response) {
        var newUser = {
          id: user ? user.id : 0, 
          email,
          name,
          password
        }

        setUser(newUser);
        localStorage.setItem('@RNAuth:user', JSON.stringify(newUser));
      }
      setLoading(false);
      resolve(response);
    });
  }

  function singOut(): Promise<boolean> {
    return new Promise(async (resolve) => {
      setLoading(true);
      localStorage.clear();
      setUser(null);
      setLoading(false);
      resolve(true);
    });
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, loading, singIn, createUser, updateUser, singOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;