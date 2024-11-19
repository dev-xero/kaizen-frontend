import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});

const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Kaizen 改 善',
    description:
        'Meaning continuous improvement, is a minimal Japanese-inspired task management web app for humans. ',
    openGraph: {
        title: 'Kaizen 改 善',
        description:
            'Meaning continuous improvement, is a minimal Japanese-inspired task management web app for humans.',
        locale: 'en_US',
        type: 'website',
        images: {
            url: 'https://kaizenweb.vercel.app/opengraph.png',
            width: 1200,
            height: 630,
        },
    },
    metadataBase: new URL('https://kaizenweb.vercel.app'),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
            >
                {children}
            </body>
        </html>
    );
}
