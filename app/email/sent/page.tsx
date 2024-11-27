'use client';

import { useEffect, useState } from 'react';
import { Mailbox } from '@phosphor-icons/react';
import { redirect } from 'next/navigation';

import keys from '@/config/keys';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';
import { hasCookie } from 'cookies-next';

function EmailVerificationSection() {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem(keys.obfuscatedEmailKey);
        if (!storedEmail) {
            if (hasCookie(keys.accessTokenKey)) {
                redirect('/');
            } else {
                redirect('/auth/signup');
            }
        } else {
            setEmail(storedEmail);
        }
    }, []);

    if (email === null) {
        return null;
    }

    return (
        <main>
            <Mailbox size={48} className="mb-4 text-primary" />
            <h2 className="font-bold text-2xl my-2">Email Sent</h2>
            <p className="text-gray-700">
                A verification email has been sent to{' '}
                <span className="text-primary">{email}</span>. Please check your
                inbox.
            </p>
        </main>
    );
}

export default function EmailSentPage() {
    return (
        <CenteredGridLayout>
            <EmailVerificationSection />
        </CenteredGridLayout>
    );
}
