import './globals.css';

import { Providers } from './providers';

import Navbar from '@/components/ui/navbar';
export const metadata = {
	title: 'AnimeRumble',
	description: 'Aplicación web para el club de anime en ESCOM',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='es' suppressHydrationWarning>
			<body>
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
