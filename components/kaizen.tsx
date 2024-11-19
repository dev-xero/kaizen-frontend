import Image from 'next/image';

export default function KaizenLogo() {
    return (
        <h2 className="mb-8 flex gap-2 items-center">
            <Image
                src="/kaizen-icon.svg"
                alt="kaizen-icon"
                className="max-w-[128px]"
                width={32}
                height={32}
            />
            <span className="font-bold text-xl">Kaizen</span>
        </h2>
    );
}
