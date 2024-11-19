'use client';

import KaizenLogo from '@/components/kaizen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';
import { cn } from '@/lib/utils';
import { At, Lock, UserCircle } from '@phosphor-icons/react';

function LoginForm() {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="max-w-lg">
            <KaizenLogo />
            <h2 className="font-bold text-2xl my-2">Login</h2>
            <p>
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
                        placeholder="Username"
                        className={cn(
                            'pl-10 py-2 border border-gray-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100'
                        )}
                    />
                </div>
            </div>
            <Button
                name="kaizen-button"
                className="bg-indigo-500 font-bold text-xl mt-2 w-full hover:bg-indigo-600"
            >
                Login
            </Button>
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
