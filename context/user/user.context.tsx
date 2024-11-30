'use client';

import { User } from '@/types/user.type';
import { createContext, Dispatch, SetStateAction } from 'react';

interface IUserContext {
    loggedInUser: User | null;
    setLoggedInUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<IUserContext>({
    loggedInUser: null,
    setLoggedInUser: () => {},
});
