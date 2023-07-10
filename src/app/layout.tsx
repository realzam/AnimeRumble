import './globals.css';

import Navbar from '../components/ui/Navbar';

import { Providers } from './Providers';

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
