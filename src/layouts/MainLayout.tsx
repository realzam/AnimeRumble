import Head from 'next/head';

import { Navbar } from '@/components/ui';

interface Props {
	title: string;
	children: JSX.Element | JSX.Element[];
}

export const MainLayout = ({ children, title }: Props) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<nav>
				<Navbar />
			</nav>

			<main
				style={{
					margin: '40px auto',
					maxWidth: '1440px',
					padding: '0px 30px',
				}}
			>
				{children}
			</main>
		</>
	);
};
