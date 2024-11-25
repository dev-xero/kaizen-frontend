import CenteredGridLayout from '@/layouts/CenteredGridLayout';

export default function HomeFragment() {
    return (
        <CenteredGridLayout>
            <main>
                <h2 className="font-bold text-2xl my-2">Welcome to Kaizen.</h2>
                <p className="text-gray-700">
                    You&apos;ve been successfully authenticated.
                </p>
            </main>
        </CenteredGridLayout>
    );
}
