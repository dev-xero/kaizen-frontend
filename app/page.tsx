import ProtectedPage from '@/components/protectedpage';
import ScreenProvider from '@/context/screen/screen.provider';
import HomeFragment from '@/fragments/homefragment';

export default function Home() {
    return (
        <ProtectedPage>
            <ScreenProvider>
                <HomeFragment />
            </ScreenProvider>
        </ProtectedPage>
    );
}
