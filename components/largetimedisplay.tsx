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
        <section className="w-full rounded-lg border border-[#D4D5D6] relative overflow-hidden bg-white h-[164px] p-4 font-[family-name:var(--font-geist-sans)]">
            <Image
                src="/plant.svg"
                alt=""
                width={120}
                height={220}
                className="absolute left-[-32px] bottom-[-20px]"
            />
            <section className="w-full flex flex-col items-center justify-center h-full">
                <h1 className="font-extrabold text-[52px] text-[#12111A]">
                    {formatTime(currDate)}
                </h1>
                <h3 className="font-bold text-2xl text-[#7E7D84]">
                    {formatDate()}
                </h3>
            </section>
        </section>
    );
}
