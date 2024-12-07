import LargeTimeDisplay from '@/components/largetimedisplay';
import MyTasks from '@/components/mytasks';
import { Toaster } from '@/components/ui/sonner';
import { CheckCircle, Info, XCircle } from '@phosphor-icons/react';
import { AlertTriangle, Loader } from 'lucide-react';

export default function PersonalView() {
    return (
        <section>
            <LargeTimeDisplay />
            <MyTasks />
            <Toaster
                className="toaster group"
                toastOptions={{
                    classNames: {
                        toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                        description: "group-[.toast]:text-muted-foreground",
                        actionButton:
                            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                        cancelButton:
                            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    },
                }}
                icons={{
                    success: <CheckCircle className="h-5 w-5 text-green-500" />,
                    info: <Info className="h-5 w-5 text-blue-500" />,
                    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
                    error: <XCircle className="h-5 w-5 text-red-500"  weight='fill' />,
                    loading: <Loader className="h-6 w-6 text-gray-500 animate-spin" />,
                }}
            />
        </section>
    );
}
