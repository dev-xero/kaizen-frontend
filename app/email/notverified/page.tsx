import Link from '@/components/link';
import vars from '@/config/variables';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';

function NotVerifiedFragment() {
    return (
        <main>
            <h2 className="font-bold text-2xl my-2">
                Your account could not be verified
            </h2>
            <p className="text-gray-700 mb-4 dark:text-gray-300">
                We were unable to verify your email address.
                <br />
                If you believe this is an error, please contact{' '}
                <a
                    className="text-primary dark:text-indigo-400"
                    href={`mailto:${vars.supportEmail}`}
                >
                    support.
                </a>
            </p>
            <Link
                text="Try signing up again"
                href="/auth/signup"
                external={false}
            />
        </main>
    );
}

export default function NotVerifiedPage() {
    return (
        <CenteredGridLayout>
            <NotVerifiedFragment />
        </CenteredGridLayout>
    );
}
