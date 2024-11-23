'use client';

import { Mailbox } from '@phosphor-icons/react';

import CenteredGridLayout from '@/layouts/CenteredGridLayout';

function EmailVerificationSection() {
    const email = 'default@gmail.com';

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
