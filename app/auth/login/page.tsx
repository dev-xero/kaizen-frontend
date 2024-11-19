'use client';

import { Input } from '@/components/ui/input';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';
import { At } from '@phosphor-icons/react';

function LoginForm() {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="max-w-lg">
            <h2 className="font-bold text-2xl mb-2">Login</h2>
            <p>
                Kaizen 改 善 — Meaning continuous improvement, is a minimal
                Japanese-inspired task management web app for humans.
            </p>
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <At
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
                        size={24}
                    />
                    <Input placeholder="Email address." className="pl-10 py-2 active:border-indigo-500" />
                </div>
            </div>
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
