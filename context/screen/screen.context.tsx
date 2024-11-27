'use client';

import { Dispatch, SetStateAction, createContext } from 'react';
import { screen } from './screens';

interface IScreenContext {
    currentScreen: screen;
    setCurrentScreen: Dispatch<SetStateAction<screen>>;
}

export const ScreenContext = createContext<IScreenContext>({
    currentScreen: screen.PERSONAL,
    setCurrentScreen: () => {},
});
