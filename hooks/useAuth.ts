'use client';

import keys from '@/config/keys';
import { hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const checkSession = () => {
    return (
        hasCookie(keys.accessTokenKey) &&
        localStorage.getItem(keys.userKey) != null
    );
};

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function checkAuthStatus() {
            setTimeout(() => {
                setIsAuthenticated(checkSession());
                setIsLoading(false);
            }, 500);
        }

        checkAuthStatus();
    }, []);

    return { isAuthenticated, isLoading };
};
