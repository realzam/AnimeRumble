import '@/styles/globals.css';

import { ThemeProvider } from 'next-themes';

// import Navbar from '../components/ui/Navbar';

// import { Providers } from './Providers';

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
			<body>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					{children}
				</ThemeProvider>
				{/* <Providers>
					<div className='flex flex-col min-h-screen'>
						<Navbar />
						<main className='flex flex-1'>{children}</main>
					</div>
				</Providers> */}
			</body>
		</html>
	);
}
