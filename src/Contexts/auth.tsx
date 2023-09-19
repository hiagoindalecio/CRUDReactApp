import React, {createContext, useEffect, useState } from 'react';
import { AuthContextData, User } from '../Interfaces';
import * as auth from '../services/auth';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentScreen, setCurrentScreen] = useState<string>('Home');

    useEffect(() => {
        async function loadStorageData() {
            setLoading(true);
            const storagedUser = localStorage.getItem('@RNAuth:user');
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
            const current = localStorage.getItem('@RNAuth:currentScreen');
            if (current) {
                setCurrentScreen(current);
            }
            setLoading(false);
        }
        
        if (!user) {
            loadStorageData();
        }
    }, [user]);

    async function singIn(login: string, password: string): Promise<string> {
        return new Promise(async (resolve) => {
            setLoading(true);
            const response = await auth.singIn(login, password);
            
            if (response !== '' && response !== undefined) {
                const user = {id : response as unknown as number, login: login};
                setUser(user);
                localStorage.setItem('@RNAuth:user', JSON.stringify(user));
                setLoading(false);
                resolve('Sucesso!');
            } else {
                setLoading(false);
                resolve('E-mail ou senha digitados incorretamente.');
            }
        });
    }

    async function createUser(login: string, password: string): Promise<string> {
        return new Promise(async (resolve) => {
            setLoading(true);
            const response = await auth.createUser(login, password,);
            resolve(response);
            setLoading(false);
        });
    }

    async function updateUser(id: number, login: string, password: string): Promise<string> {
        return new Promise(async (resolve) => {
            //setLoading(true);
            const response = await auth.updateUser(id, login, password);

            if(response === 'O usuário foi modificado com sucesso') {
                var newUser = {
                    id: user?.id, 
                    login: login
                }

                setUser(newUser);

                localStorage.clear();
                localStorage.setItem('@RNAuth:user', JSON.stringify(newUser));
            }
            //setLoading(false);
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