'use client';

import CenteredGridLayout from '@/layouts/CenteredGridLayout';

function LoginForm() {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="max-w-lg">
            <h2 className="font-bold text-2xl mb-2">Login</h2>
            <p>
                Kaizen 改 善 — Meaning continuous improvement, is a minimal
                Japanese-inspired task management web app for humans.
            </p>
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
