import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/auth/signup');

    return <div>Kaizen Home</div>;
}
