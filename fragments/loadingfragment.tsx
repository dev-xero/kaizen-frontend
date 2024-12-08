import { PurpleSpinner } from '@/components/spinner';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';

export default function LoadingFragment() {
    return (
        <CenteredGridLayout>
            <main>
                <h4 className="text-xl flex gap-2 items-center justify-center">
                    <PurpleSpinner />
                    Just a moment.
                </h4>
            </main>
        </CenteredGridLayout>
    );
}
