import { DarkSpinner } from '@/components/spinner';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';

export default function LoadingFragment() {
    return (
        <CenteredGridLayout>
            <main>
                <h4 className="text-xl flex gap-2 items-center justify-center">
                    <DarkSpinner />
                    Just a moment.
                </h4>
            </main>
        </CenteredGridLayout>
    );
}
