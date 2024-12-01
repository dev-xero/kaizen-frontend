import { UserContext } from '@/context/user/user.context';
import { User } from '@/types/user.type';
import { getAccessToken } from '@/util/access';
import { useContext, useEffect, useState } from 'react';

import env from '@/config/environment';
import keys from '@/config/keys';
import NetworkConfig from '@/config/network';
import axios from 'axios';

export function useUserData() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { setLoggedInUser } = useContext(UserContext);

    useEffect(() => {
        const loggedInUserString = localStorage.getItem(keys.userKey);
        if (!loggedInUserString) {
            setIsLoading(false);
            setError('No user found. Please log in.');
            return;
        }

        const loggedInUser: User = JSON.parse(loggedInUserString);

        async function makeFullRequest() {
            try {
                const accessToken = await getAccessToken(
                    loggedInUser.id,
                    loggedInUser.username
                );

                if (!accessToken) {
                    setIsLoading(false);
                    setError('Access token is missing. Please log in.');
                    return;
                }

                const { data } = await axios.get(
                    `${env.api}/user/info/${loggedInUser.username}`,
                    {
                        headers: {
                            ...NetworkConfig.headers,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                // Synchronously update local storage before setting state
                const cachedDataString = JSON.stringify(data.data);
                localStorage.setItem(keys.userKey, cachedDataString);
                localStorage.setItem(keys.forceUpdateKey, 'false');
                localStorage.setItem(keys.cacheTimeKey, Date.now().toString());

                await Promise.all([
                    setLoggedInUser(data.data),
                    setUser(data.data),
                ]);

                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setIsLoading(false);
                setError('Failed to fetch user data.');
            }
        }

        async function checkCacheAndUpdate() {
            const cachedTime = localStorage.getItem(keys.cacheTimeKey);
            const forceUpdate =
                localStorage.getItem(keys.forceUpdateKey) === 'true';

            if (!cachedTime || forceUpdate) {
                console.log(
                    '[CACHE]: Cache miss or forced update, fetching fresh data.'
                );
                await makeFullRequest();
            } else {
                const FIVE_MINS_MS = 5 * 60 * 1000;
                const diff = Date.now() - parseInt(cachedTime, 10);

                if (diff > FIVE_MINS_MS) {
                    console.log('[CACHE]: Cache expired, fetching fresh data.');
                    await makeFullRequest();
                } else {
                    const savedUser = localStorage.getItem(keys.userKey);
                    if (savedUser) {
                        // Ensure state is set synchronously
                        await Promise.all([
                            setUser(JSON.parse(savedUser)),
                            setIsLoading(false),
                        ]);
                        console.log('[CACHE]: Using cached data.');
                    }
                }
            }
        }

        checkCacheAndUpdate();
    }, [setLoggedInUser]);

    return { user, setLoggedInUser, isLoading, error };
}
