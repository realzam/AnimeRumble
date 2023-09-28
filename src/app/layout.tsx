import '@/styles/globals.css';

import { Poppins } from 'next/font/google';

import { Providers } from './Providers';

const poppins = Poppins({
	subsets: ['latin'],
	weight: '400',
});
export const metadata = {
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
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='es' suppressHydrationWarning>
			<body className={poppins.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
