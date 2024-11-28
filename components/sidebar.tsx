'use client';

import { ScreenContext } from '@/context/screen/screen.context';
import { screen } from '@/context/screen/screens';
import {
    BookOpen,
    FolderUser,
    Gear,
    UsersThree,
    X,
} from '@phosphor-icons/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useContext } from 'react';
import Overlay from './overlay';

type SidebarItemProps = {
    icon: React.ReactNode;
    text: string;
    isActive: boolean;
    onClick: () => void;
};

type SidebarProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SidebarItem(props: SidebarItemProps) {
    return (
        <li
            className={clsx(
                'flex gap-2 items-center cursor-pointer p-2 hover:border-y-[#ECEDEFAA] select-none relative border border-transparent font-[family-name:var(--font-geist-sans)] w-full',
                props.isActive && 'bg-[#ECEDEFAA]  !border-y-indigo-200'
            )}
            onClick={props.onClick}
        >
            <div className={props.isActive ? 'text-primary' : 'text-gray-700'}>
                {props.icon}
            </div>
            <span className={props.isActive ? 'text-primary' : 'text-gray-700'}>
                {props.text}
            </span>
        </li>
    );
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const { currentScreen, setCurrentScreen } = useContext(ScreenContext);

    function setActiveView(to: screen) {
        setCurrentScreen(to);
        setIsOpen(() => false);
    }

    return (
        <>
            <aside
                className={clsx(
                    'fixed top-0 sm:static col-span-1 border-r border-r-[#D4D5D6] h-dvh py-4 z-[999] bg-white max-w-[280px] sm:max-w-full w-full',
                    'transition-transform duration-300 ease-in-out transform sm:!translate-x-0',
                    isOpen ? 'translate-x-0' : 'translate-x-[-300px]'
                )}
            >
                <header className="flex justify-between items-center mb-4 px-2">
                    <h2 className="flex gap-2 items-center justify-center cursor-default pl-2">
                        <Image
                            src="/kaizen-icon.svg"
                            alt="kaizen-icon"
                            className="max-w-[128px]"
                            width={24}
                            height={24}
                        />
                        <span className="font-bold text-xl">Kaizen</span>
                    </h2>
                    <div
                        className="cursor-pointer p-2 inline-block sm:hidden"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <X size={24} className="text-gray-700" />
                    </div>
                </header>
                <section className="flex flex-col">
                    <ul className="flex flex-col grow h-full">
                        <SidebarItem
                            icon={
                                <FolderUser
                                    size={24}
                                    // weight={
                                    //     currentScreen === screen.PERSONAL
                                    //         ? 'fill'
                                    //         : 'regular'
                                    // }
                                />
                            }
                            text="Personal"
                            isActive={currentScreen === screen.PERSONAL}
                            onClick={() => setActiveView(screen.PERSONAL)}
                        />
                        <SidebarItem
                            icon={
                                <UsersThree
                                    size={24}
                                    // weight={
                                    //     currentScreen === screen.TEAMS
                                    //         ? 'fill'
                                    //         : 'regular'
                                    // }
                                />
                            }
                            text="Teams"
                            isActive={currentScreen === screen.TEAMS}
                            onClick={() => setActiveView(screen.TEAMS)}
                        />
                        <SidebarItem
                            icon={
                                <Gear
                                    size={24}
                                    // weight={
                                    //     currentScreen === screen.SETTINGS
                                    //         ? 'fill'
                                    //         : 'regular'
                                    // }
                                />
                            }
                            text="Settings"
                            isActive={currentScreen === screen.SETTINGS}
                            onClick={() => setActiveView(screen.SETTINGS)}
                        />
                        <SidebarItem
                            icon={
                                <BookOpen
                                    size={24}
                                    // weight={
                                    //     currentScreen === screen.OPEN_SOURCE
                                    //         ? 'fill'
                                    //         : 'regular'
                                    // }
                                />
                            }
                            text="Open Source"
                            isActive={currentScreen === screen.OPEN_SOURCE}
                            onClick={() => setActiveView(screen.OPEN_SOURCE)}
                        />
                    </ul>
                </section>
            </aside>
            {isOpen && <Overlay />}
        </>
    );
}
