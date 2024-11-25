import ProtectedPage from '@/components/protectedpage';
import HomeFragment from '@/fragments/homefragment';

export default function Home() {
    return (
        <ProtectedPage>
            <HomeFragment />
        </ProtectedPage>
    );
}
