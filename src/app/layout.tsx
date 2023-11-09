import { type Metadata, type Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import { cn } from '@/lib/utils';
import Navbar from '@web/Navbar';
import { Providers } from '@/components/providers/Providers';

import '@/styles/globals.css';

const poppins = Poppins({
	subsets: ['latin'],
	weight: '400',
});

export const metadata: Metadata = {
	title: 'AnimeRumble',
	description: 'Aplicación web para el club de anime en ESCOM',
	keywords: [
		'Anime',
		'ESCOM',
		'IPN',
		'Games',
		'Club',
		'Rumble',
		'Next.js',
		'React',
		'Tailwind CSS',
	],
	authors: [
		{
			name: 'realzam',
			url: 'https://github.com/realzam',
		},
	],
	creator: 'realzam',
	icons: {
		icon: '/favicon.ico',
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='es' suppressHydrationWarning>
			<body className={cn(poppins.className, 'antialiased')}>
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
