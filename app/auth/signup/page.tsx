'use client';

import ErrorMessage from '@/components/error';
import FormFooter from '@/components/formfooter';
import KaizenLogo from '@/components/kaizen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';
import { cn } from '@/lib/utils';
import { At, Lock, UserCircle } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

function SignUpForm() {
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    function prepareHandler() {
        setErrMessage('');
        setIsDisabled(true);
    }

    function displayErrorMessage(msg: string) {
        setErrMessage(msg);
        setIsDisabled(false);
    }

    async function handleSignUpEvent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        prepareHandler();

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        // Email address must be valid
        if (!emailRegex.test(emailAddress)) {
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

        try {
            // make mutation request
        } catch (err) {
            console.error(err);
            setErrMessage('Something went wrong.');
        }

        router.push('/email/sent');
    }

    return (
        <form onSubmit={handleSignUpEvent} className="max-w-lg">
            <KaizenLogo />
            <h2 className="font-bold text-2xl my-2">Sign Up</h2>
            <p className="text-gray-700">
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
                            'pl-10 py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                        )}
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
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
                            'pl-10 py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
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
                            'pl-10 py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                        )}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errMessage && <ErrorMessage msg={errMessage} />}
            </div>
            <Button
                name="kaizen-button"
                className="bg-indigo-500 font-bold text-xl mt-2 w-full hover:bg-indigo-600"
                disabled={isDisabled}
            >
                Sign Up
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
