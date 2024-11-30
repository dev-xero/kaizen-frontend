'use client';

import keys from '@/config/keys';
import { User } from '@/types/user.type';
import React, { useEffect, useState } from 'react';
import { UserContext } from './user.context';

type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    // Fetch saved user on render.
    useEffect(() => {
        const storedUser = localStorage.getItem(keys.userKey);
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
