import MobileHeader from './mobileheader';
import { useEffect } from 'react';

type MainViewProps = {
    screen: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainView({ screen, isOpen, setIsOpen }: MainViewProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <main className="w-full col-span-5">
            <MobileHeader setIsOpen={setIsOpen} />
            <section className="col-span-5 min-h-screen w-full bg-[#ECEDEF] mt-14 sm:mt-0 p-2 sm:p-4">
                {screen}
            </section>
        </main>
    );
}
