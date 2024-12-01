'use client';

import { ScreenContext } from '@/context/screen/screen.context';
import { screen } from '@/context/screen/screens';
import { useContext, useState } from 'react';

import MainView from '@/components/mainview';
import Sidebar from '@/components/sidebar';
import OpenSourceView from '@/views/opensource.view';
import PersonalView from '@/views/personal.view';
import SettingsView from '@/views/settings.view';
import TeamsView from '@/views/teams.view';
// import { UserContext } from '@/context/user/user.context';

export default function HomeFragment() {
    const { currentScreen } = useContext(ScreenContext);
    // const { setLoggedInUser } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    let screenComponent: JSX.Element | null = null;
    switch (currentScreen) {
        case screen.PERSONAL:
            screenComponent = <PersonalView />;
            break;

        case screen.TEAMS:
            screenComponent = <TeamsView />;
            break;

        case screen.SETTINGS:
            screenComponent = <SettingsView />;
            break;

        case screen.OPEN_SOURCE:
            screenComponent = <OpenSourceView />;
            break;

        default:
            screenComponent = <SettingsView />;
            break;
    }

    return (
        <main className="relative sm:grid grid-cols-6 w-full">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <MainView
                screen={screenComponent}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </main>
    );
}
