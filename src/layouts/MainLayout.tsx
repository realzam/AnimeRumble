import Head from 'next/head';

import { Box } from '@mui/material';

import { Navbar } from '@/components/ui';

interface Props {
	title: string;
	children: JSX.Element | JSX.Element[];
	useMain?: boolean;
}

export const MainLayout = ({ children, title, useMain = true }: Props) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				}}
			>
				<nav
					style={{
						flexShrink: 0,
					}}
				>
					<Navbar />
				</nav>
				{useMain ? (
					<main
						style={{
							margin: '40px auto',
							maxWidth: '1440px',
							padding: '0px 30px',
						}}
					>
						{children}
					</main>
				) : (
					children
				)}
			</Box>
		</>
	);
};
