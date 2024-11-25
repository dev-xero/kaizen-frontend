'use client';

import FormFooter from '@/components/formfooter';
import KaizenLogo from '@/components/kaizen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';
import { cn } from '@/lib/utils';
import { At, Lock } from '@phosphor-icons/react';
import { SignInDTO, SignInResponse } from './signin.types';
import NetworkConfig from '@/config/network';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import TransformErrorMessage from '@/util/transformer';
import { FormEvent, useState } from 'react';
import { emailRegex } from '@/config/regex';
import Spinner from '@/components/spinner';
import ErrorMessage from '@/components/error';
import env from '@/config/environment';
import keys from '@/config/keys';
import { setCookie } from 'cookies-next';
import { getDateAfter } from '@/util/date';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    // Makes sign in request
    async function signInRequest(signInDTO: SignInDTO) {
        const endpoint = `${env.api}/auth/signin`;
        const { data } = await axios.post(endpoint, signInDTO, NetworkConfig);

        return data;
    }

    // Called after a successful signin attempt
    function signInRequestCompleted(res: SignInResponse) {
        const { accessToken, refreshToken, ...user } = res.data;

        localStorage.setItem(keys.userKey, JSON.stringify(user));

        // Save access token key - TTL 1hr
        setCookie(keys.accessTokenKey, accessToken, {
            expires: getDateAfter(1),
        });

        // Save refresh token key - TTL 2 days
        setCookie(keys.refreshTokenKey, refreshToken, {
            expires: getDateAfter(48),
        });
    }

    // Signin mutation
    const signinMutation = useMutation({
        mutationFn: signInRequest,
        onSuccess: signInRequestCompleted,
        onError: (err) => {
            console.warn(err);
            const msg = TransformErrorMessage(err);

            displayErrorMessage(msg);
        },
    });

    // Clears error messages and disables the button
    function prepareHandler() {
        setErrMessage('');
        setIsDisabled(true);
    }

    // Displays error messages and re-enables the button
    function displayErrorMessage(msg: string) {
        setErrMessage(msg);
        setIsDisabled(false);
    }

    async function handleSignInEvent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        prepareHandler();

        if (!emailRegex.test(email)) {
            displayErrorMessage('Please enter a valid email address.');
            return;
        }

        // Password must be at least 8 chars
        if (password.trim().length < 8) {
            displayErrorMessage(
                'Your password should be at least eight characters long.'
            );
        }

        signinMutation.mutate({ email, password });
    }

    return (
        <form onSubmit={handleSignInEvent} className="max-w-lg">
            <KaizenLogo />
            <h2 className="font-bold text-2xl my-2">Login</h2>
            <p className="text-gray-700">
                Welcome back to Kaizen 改 善 — we&apos;re glad to see you again.
            </p>
            {/* TextFields */}
            <div className="flex flex-col gap-2 my-4">
                {/* EMAIL ADDRESS */}
                <div className="relative">
                    <At
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
                        size={24}
                    />
                    <Input
                        name="kaizen-email"
                        type="email"
                        required={true}
                        placeholder="Email address"
                        className={cn(
                            'pl-10 py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                        )}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* PASSWORD */}
                <div className="relative">
                    <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
                        size={24}
                    />
                    <Input
                        name="kaizen-password"
                        type="password"
                        required={true}
                        placeholder="Password"
                        className={cn(
                            'pl-10 py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                        )}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            {errMessage && <ErrorMessage msg={errMessage} />}
            <Button
                name="kaizen-button"
                className="bg-indigo-500 font-bold text-xl mt-2 w-full hover:bg-indigo-600 disabled:opacity-90 disabled:cursor-default"
                disabled={isDisabled}
            >
                {signinMutation.isPending ? (
                    <span className="flex gap-2 items-center justify-center">
                        <Spinner /> Logging In
                    </span>
                ) : (
                    <span>Login</span>
                )}
            </Button>
            <FormFooter alternative="signup" />
        </form>
    );
}

export default function LoginPage() {
    return (
        <CenteredGridLayout>
            <LoginForm />
        </CenteredGridLayout>
    );
}
