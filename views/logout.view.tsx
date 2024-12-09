'use client';

import { Button } from '@/components/ui/button';

export default function LogOutView() {
    function ClearStorageAndLogOut() {
        localStorage.clear();
        // TODO: Make request to clear this session on the backend
        window.location.href = '/auth/login';
    }

    return (
        <section className="grid place-items-center min-h-screen text-center">
            <section>
                <h2 className="font-bold text-2xl mb-2">Log Out Of This Device</h2>
                <p className="text-gray-700 dark:text-gray-400 my-2">
                    Log out of your account on this device. This will clear your
                    current session.
                </p>
                <Button
                    className="bg-primary font-bold text-white my-4 w-full"
                    onClick={ClearStorageAndLogOut}
                >
                    Log Me Out
                </Button>
            </section>
        </section>
    );
}
