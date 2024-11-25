'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import LoadingFragment from '@/fragments/loadingfragment';

type ProtectedPageProps = {
    children: React.ReactNode;
};

export default function ProtectedPage(props: ProtectedPageProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) return <LoadingFragment />;

    if (!isAuthenticated) return <></>;

    return <>{props.children}</>;
}
