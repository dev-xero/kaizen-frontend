import { transformMonth, transformWeekDay } from '@/util/date';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LargeTimeDisplay() {
    const [currDate, setCurrDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrDate(new Date()); // Update to the current time
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    function formatTime(currDate: Date): string {
        const minute = currDate.getMinutes();
        const paddedMinute = `${minute}`.padStart(2, '0');

        const hour = currDate.getHours();
        const paddedHour = `${hour % 12 || 12}`.padStart(2, '0');

        const amOrPM = hour < 12 ? 'AM' : 'PM';

        return `${paddedHour}:${paddedMinute} ${amOrPM}`;
    }

    function formatDate(): string {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth();
        const weekday = date.getDay();

        return `${transformWeekDay(weekday)}, ${transformMonth(month)} ${day}`;
    }

    return (
        <section className="w-full rounded-lg border dark:bg-zinc-950 dark:border-zinc-800 border-[#D4D5D6] relative overflow-hidden bg-white h-[100px] sm:h-[164px] p-2 sm:p-4 font-[family-name:var(--font-geist-sans)]">
            <Image
                src="/plant.svg"
                alt=""
                width={120}
                height={220}
                priority={true}
                className="absolute left-[-32px] bottom-[-20px] w-[100px] h-[140px] sm:w-[120px] sm:h-[220px]"
            />
            <section className="w-full flex flex-col items-center justify-center sm:gap-4 h-full sm:mt-2">
                <h1 className="font-extrabold text-2xl sm:text-[52px] text-[#12111A] dark:text-indigo-100">
                    {formatTime(currDate)}
                </h1>
                <h3 className="font-bold text-base sm:text-xl text-[#7E7D84] dark:text-gray-500">
                    {formatDate()}
                </h3>
            </section>
        </section>
    );
}
