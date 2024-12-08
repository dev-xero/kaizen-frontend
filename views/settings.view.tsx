import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='w-full max-w-[200px]'>
                <Button variant="outline">
                    <span>Currently set as {theme}</span>
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

export default function SettingsView() {
    return (
        <section>
            <h2 className="font-bold text-2xl text-gray-900 mb-2 dark:text-indigo-200">Settings</h2>
            <p className="text-gray-700 my-2 dark:text-gray-400 mb-8">
                General device and account settings.
            </p>

            {/* THEME */}
            <section>
                <h3 className="font-bold text-base mb-4 text-gray-700 dark:text-gray-400">Site Theme</h3>
                <ThemeToggle />
            </section>
        </section>
    );
}
