import { List } from '@phosphor-icons/react';
import Image from 'next/image';

type MobileHeaderProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileHeader(props: MobileHeaderProps) {
    return (
        <header className="flex items-center justify-between p-2 border-l-[#D4D5D6] bg-white/80 backdrop-blur-md  md:hidden fixed top-0 left-0 z-[996] w-full dark:bg-zinc-950/80 dark:border-l-zinc-800">
            <h2 className="flex gap-2 items-center justify-center cursor-default pl-2">
                <Image
                    src="/kaizen-icon.svg"
                    alt="kaizen-icon"
                    className="max-w-[128px]"
                    width={24}
                    height={24}
                    priority={true}
                />
                <span className="font-bold text-xl">Kaizen</span>
            </h2>

            <div
                className="p-2 inline-block cursor-pointer"
                onClick={() => props.setIsOpen((prev) => !prev)}
            >
                <List size={24} className="text-gray-700 dark:text-gray-400" />
            </div>
        </header>
    );
}
