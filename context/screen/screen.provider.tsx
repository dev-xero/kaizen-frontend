'use client';

import { useState } from 'react';
import { screen } from './screens';
import { ScreenContext } from './screen.context';

interface IScreenProviderProps {
    children: React.ReactNode;
}

const ScreenProvider = ({ children }: IScreenProviderProps) => {
    const [currentScreen, setCurrentScreen] = useState(screen.PERSONAL);

    return (
        <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
            {children}
        </ScreenContext.Provider>
    );
};

export default ScreenProvider;
