import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    //Função de Login do User

    //Adiciona topicos do localstorage para sessão
    useEffect(() => {
            localStorage.setItem('@App:user', JSON.stringify(user));
            localStorage.setItem('@App:token', token);
    }, [token, user])

    const Login = async(userObj) => {
            setUser(userObj.user);
            setToken(userObj.token);

    }

    const Update = async(obj) => {
        setUser(obj)
    }

    const Logout = () => {
        setUser(null);

        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:token');
    }

    return (
        <AuthContext.Provider value={ { signed: Boolean(user), Login, user, Update, Logout } }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;