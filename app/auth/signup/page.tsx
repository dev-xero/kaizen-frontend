'use client';

import ErrorMessage from '@/components/error';
import FormFooter from '@/components/formfooter';
import KaizenLogo from '@/components/kaizen';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import env from '@/config/environment';
import keys from '@/config/keys';
import NetworkConfig from '@/config/network';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';
import { cn } from '@/lib/utils';
import TransformErrorMessage from '@/util/transformer';
import { At, Lock, UserCircle } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { SignUpResponse, SignUpDTO } from './signup.types';
import { useRouter } from 'next/navigation';
import { emailRegex } from '@/config/regex';

function SignUpForm() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    // Makes sign up request
    async function signUpRequest(userDTO: SignUpDTO) {
        const endpoint = `${env.api}/auth/signup`;
        const { data } = await axios.post(endpoint, userDTO, NetworkConfig);

        return data;
    }

    // Saves server response in local storage and cookies
    function signUpRequestCompleted(res: SignUpResponse) {
        const { obfuscatedEmail } = res.data;

        localStorage.setItem(keys.obfuscatedEmailKey, obfuscatedEmail);

        router.push('/email/sent');
    }

    const signUpMutation = useMutation({
        mutationFn: signUpRequest,
        onSuccess: signUpRequestCompleted,
        onError: (err) => {
            console.warn(err);
            const errMsg = TransformErrorMessage(err);

            displayErrorMessage(errMsg);
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

    async function handleSignUpEvent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        prepareHandler();

        // Email address must be valid
        if (!emailRegex.test(email)) {
            displayErrorMessage('Please enter a valid email address.');
            return;
        }

        // Password needs to be at least 8 chars
        if (password.trim().length < 8) {
            displayErrorMessage(
                'Your password should be at least eight characters long.'
            );
            return;
        }

        // Username need to be at least 4 chars
        if (username.trim().length < 4) {
            displayErrorMessage(
                'Your username should be at least four characters long.'
            );
            return;
        }

        signUpMutation.mutate({ email, username, password });
    }

    return (
        <form onSubmit={handleSignUpEvent} className="max-w-lg">
            <KaizenLogo />
            <h2 className="font-bold text-2xl my-2">Sign Up</h2>
            <p className="text-gray-700 dark:text-gray-400">
                Kaizen 改 善 — Meaning continuous improvement, is a minimal
                Japanese-inspired task management web app for humans.
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
                            'pl-10 py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                        )}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* USERNAME */}
                <div className="relative">
                    <UserCircle
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
                        size={24}
                    />
                    <Input
                        name="kaizen-username"
                        type="text"
                        required={true}
                        placeholder="Username"
                        className={cn(
                            'pl-10 py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                        )}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                            'pl-10 py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                        )}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errMessage && <ErrorMessage msg={errMessage} />}
            </div>
            <Button
                name="kaizen-button"
                className="bg-indigo-500 font-bold text-xl mt-2 w-full hover:bg-indigo-600 disabled:opacity-90 disabled:cursor-default text-gray-200"
                disabled={isDisabled}
            >
                {signUpMutation.isPending ? (
                    <span className="flex gap-2 items-center justify-center">
                        <Spinner /> Signing Up
                    </span>
                ) : (
                    <span>Sign Up</span>
                )}
            </Button>
            <FormFooter alternative="login" />
        </form>
    );
}

export default function SignUpPage() {
    return (
        <CenteredGridLayout>
            <SignUpForm />
        </CenteredGridLayout>
    );
}
