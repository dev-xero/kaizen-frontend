import ProtectedPage from '@/components/protectedpage';
import ScreenProvider from '@/context/screen/screen.provider';
import { UserProvider } from '@/context/user/user.provider';
import HomeFragment from '@/fragments/homefragment';

export default function Home() {
    return (
        <ProtectedPage>
            <UserProvider>
                <ScreenProvider>
                    <HomeFragment />
                </ScreenProvider>
            </UserProvider>
        </ProtectedPage>
    );
}
