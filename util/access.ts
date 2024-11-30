import env from '@/config/environment';
import keys from '@/config/keys';
import NetworkConfig from '@/config/network';
import axios from 'axios';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

/**
 * This utility function returns the access token which is saved as a cookie.
 * It attempts to generate a new one if it has expired and returns that or returns
 * null if both the access and refresh tokens have expired.
 *
 * @returns a string representing the access token.
 */
export async function getAccessToken(
    id: number,
    username: string
): Promise<string | null> {
    try {
        if (hasCookie(keys.accessTokenKey)) {
            return getCookie(keys.accessTokenKey) as string;
        } else {
            if (!hasCookie(keys.refreshTokenKey)) {
                // User needs to sign up again.
                return null;
            } else {
                // Otherwise make a request to generate a new access token
                const refreshToken = getCookie(keys.refreshTokenKey);

                const { data } = await axios.post(
                    `${env.api}/auth/generate?id=${id}&username=${username}`,
                    {
                        refresh: refreshToken,
                    },
                    NetworkConfig
                );

                // set new access token
                const accessToken = data.accessToken;
                setCookie(keys.accessTokenKey, accessToken);
                return accessToken;
            }
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}
