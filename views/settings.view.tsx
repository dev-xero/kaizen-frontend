import { useTheme } from 'next-themes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    PaintBrushBroad,
    UserCircle,
    LockKeyOpen,
    Warning,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="w-full sm:max-w-[200px] dark:bg-zinc-900"
            >
                <Button variant="outline">
                    <span>Currently set to {theme} theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ProfileInformation() {
    return (
        <section className="p-4 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-900 rounded-lg">
            <h3 className="flex items-center gap-2 text-primary dark:text-indigo-400 py-2">
                <UserCircle size={32} />
                <span>Profile Information</span>
            </h3>
            <p className="text-gray-700 my-2 dark:text-gray-400 mb-8">
                General account settings to change username or email.
            </p>

            <section className="flex flex-col gap-4">
                <Input
                    name="kaizen-settings-username"
                    type="text"
                    required={true}
                    placeholder="username"
                    className={cn(
                        'py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                    )}
                />
                <Input
                    name="kaizen-settings-email"
                    type="email"
                    required={true}
                    placeholder="email"
                    className={cn(
                        'py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                    )}
                />

                <Button className="font-bold text-white bg-primary mt-4 w-full sm:max-w-[240px]">
                    Save Changes
                </Button>
            </section>
        </section>
    );
}

function Preferences() {
    return (
        <section className="p-4 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-900 rounded-lg">
            <h3 className="flex items-center gap-2 text-primary dark:text-indigo-400 py-2">
                <PaintBrushBroad size={32} />
                <span>Preferences</span>
            </h3>
            <p className="text-gray-700 my-2 dark:text-gray-400 mb-8">
                Site theme on device and cache settings.
            </p>

            <section className="flex flex-col gap-4">
                <section className="flex justify-between sm:items-center sm:flex-row flex-col gap-4 sm:gap-0">
                    <p>
                        <h3 className="font-bold text-gray-700 dark:text-gray-200">
                            Site Theme
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Choose between light, dark or system theme.
                        </p>
                    </p>
                    <ThemeToggle />
                </section>

                <section className="flex sm:justify-between sm:items-center sm:flex-row flex-col gap-4 sm:gap-0">
                    <p>
                        <h3 className="font-bold text-gray-700 dark:text-gray-200">
                            Cached Data
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Clear device cache to fetch recent data on refresh.
                        </p>
                    </p>
                    <Button className="text-white font-bold w-full sm:max-w-[200px]">
                        Clear Cache
                    </Button>
                </section>
            </section>
        </section>
    );
}

function UpdatePassword() {
    return (
        <section className="p-4 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-900 rounded-lg">
            <h3 className="flex items-center gap-2 text-primary dark:text-indigo-400 py-2">
                <LockKeyOpen size={32} />
                <span>Password</span>
            </h3>
            <p className="text-gray-700 my-2 dark:text-gray-400 mb-8">
                Update your password incase you&apos;ve forgotten.
            </p>

            <section className="flex flex-col gap-4">
                <Input
                    name="kaizen-settings-old-password"
                    type="password"
                    required={true}
                    placeholder="Old Password"
                    className={cn(
                        'py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                    )}
                />
                <Input
                    name="kaizen-settings-password"
                    type="password"
                    required={true}
                    placeholder="New Password"
                    className={cn(
                        'py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                    )}
                />
                <Input
                    name="kaizen-settings-re-password"
                    type="password"
                    required={true}
                    placeholder="Re-type New Password"
                    className={cn(
                        'py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                    )}
                />

                <Button className="font-bold text-white bg-primary mt-4 w-full sm:max-w-[240px]">
                    Update password
                </Button>
            </section>
        </section>
    );
}

function DangerZone() {
    return (
        <section className="p-4 bg-white dark:bg-zinc-950 border border-red-500 dark:border-red-400 rounded-lg">
            <h3 className="flex items-center gap-2 text-red-500 dark:text-red-400 py-2">
                <Warning size={32} />
                <span>Danger Zone</span>
            </h3>
            <p className="text-gray-700 my-2 dark:text-gray-400 mb-4">
                Permanently delete account data. This action is not reversible.
            </p>
            <Button className="bg-red-500 font-bold text-white hover:bg-red-700 sm:max-w-[200px] w-full">
                Delete My Account
            </Button>
        </section>
    );
}

export default function SettingsView() {
    return (
        <section>
            <h2 className="font-bold text-2xl text-gray-900 mb-4 dark:text-indigo-200">
                Settings
            </h2>

            <section className="gap-4 flex flex-col">
                <ProfileInformation />
                <Preferences />
                <UpdatePassword />
                <DangerZone />
            </section>
        </section>
    );
}
