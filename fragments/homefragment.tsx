'use client';

import { ScreenContext } from '@/context/screen/screen.context';
import { screen } from '@/context/screen/screens';
import { User } from '@/types/user.type';
import { useContext, useEffect, useState } from 'react';

import MainView from '@/components/mainview';
import Sidebar from '@/components/sidebar';
import OpenSourceView from '@/views/opensource.view';
import PersonalView from '@/views/personal.view';
import SettingsView from '@/views/settings.view';
import TeamsView from '@/views/teams.view';
import axios from 'axios';
import env from '@/config/environment';
import keys from '@/config/keys';
import NetworkConfig from '@/config/network';
import { getAccessToken } from '@/util/access';
import { UserContext } from '@/context/user/user.context';

export default function HomeFragment() {
    const { currentScreen } = useContext(ScreenContext);
    const { setLoggedInUser } = useContext(UserContext);
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

    // Fetch latest user data from server on load
    useEffect(() => {
        const loggedInUserString = localStorage.getItem(keys.userKey);

        if (!loggedInUserString) {
            window.location.href = '/auth/login';
            return;
        }

        const loggedInUser: User = JSON.parse(loggedInUserString);

        async function makeFullRequest() {
            try {
                // get access token
                const accessToken = await getAccessToken(
                    loggedInUser.id,
                    loggedInUser.username
                );

                if (!accessToken) {
                    window.location.href = '/auth/login';
                    return;
                }

                // make user info request
                const { data } = await axios.get(
                    `${env.api}/user/info/${loggedInUser.username}`,
                    {
                        headers: {
                            ...NetworkConfig.headers,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                const cachedDataString = JSON.stringify(data.data);
                localStorage.setItem(keys.forceUpdateKey, 'false');
                localStorage.setItem(keys.userKey, cachedDataString);
                localStorage.setItem(keys.cacheTimeKey, Date.now().toString()); // save last request time

                setLoggedInUser(data.data);
            } catch {
                // TODO:
                // we should inform the user that we couldn't make the request, using
                // a notification library
            }
        }

        async function updateUserData() {
            if (!localStorage.getItem(keys.userKey)) {
                window.location.href = '/auth/login';
            }

            if (!localStorage.getItem(keys.cacheTimeKey)) {
                // If we don't have a cache time saved at all, make a full request.
                console.log(
                    '[CACHE]: miss, performing full request, not cached.'
                );
                makeFullRequest();
                console.log('[CACHE]: completed.');
            } else {
                // If the force update flag isn't set to true, we can skip full refresh
                const shouldSkipUpdate =
                    localStorage.getItem(keys.forceUpdateKey) &&
                    localStorage.getItem(keys.forceUpdateKey) == 'false';

                if (!shouldSkipUpdate) {
                    console.log('[CACHE]: miss, making forced request.');
                    makeFullRequest();
                    console.log('[CACHE]: completed.');
                } else {
                    // If the last cache time difference is more than 5 mins, make a full request.
                    const FIVE_MINS_MS = 5 * 60 * 1000;
                    const diff =
                        Date.now() -
                        parseInt(
                            localStorage.getItem(keys.cacheTimeKey) ?? '0',
                            10
                        );

                    if (diff > FIVE_MINS_MS) {
                        console.log('[CACHE]: miss, performing full request.');
                        makeFullRequest();
                        console.log('[CACHE]: completed.');
                    } else {
                        const savedUser = localStorage.getItem(keys.userKey)!;
                        const parsedUser = JSON.parse(savedUser);
                        setLoggedInUser(parsedUser);
                        console.log(
                            '[CACHE]: hit, not performing full request.'
                        );
                    }
                }
            }
        }

        updateUserData();
    }, []);

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
