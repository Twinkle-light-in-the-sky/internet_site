import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext<{
    user: { name: string; email: string; phone?: string };
    isLoggedIn: boolean;
    login: (user: { name: string; email: string; phone?: string }) => void;
    logout: () => void;
}>({ user: { name: '', email: '' }, isLoggedIn: false, login: () => {}, logout: () => {} });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser ] = useState<{ name: string; email: string; phone?: string }>({ name: '', email: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser  = localStorage.getItem('user');
        if (storedUser ) {
            const parsedUser  = JSON.parse(storedUser );
            console.log("Loaded user from localStorage:", parsedUser );
            setUser (parsedUser );
            setIsLoggedIn(true);
        }
    }, []);

    const login = (user: { name: string; email: string; phone?: string }) => {
        console.log("Logging in user:", user);
        setUser (user);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        console.log("Logging out user");
        setUser ({ name: '', email: '' });
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    };

    return (
        <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser  = () => {
    return useContext(UserContext);
};
