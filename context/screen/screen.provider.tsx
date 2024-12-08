'use client';

import { useState } from 'react';
import { screen } from './screens';
import { ScreenContext } from './screen.context';

type ScreenProviderProps = {
    children: React.ReactNode;
}

const ScreenProvider = ({ children }: ScreenProviderProps) => {
    const [currentScreen, setCurrentScreen] = useState(screen.SETTINGS);

    return (
        <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
            {children}
        </ScreenContext.Provider>
    );
};

export default ScreenProvider;
