import { Navbar } from '@/components/ui';

type Props = {
	children: JSX.Element | JSX.Element[];
};

export const MainLayout = ({ children }: Props) => {
	return (
		<>
			<nav>
				<Navbar />
			</nav>

			<main
				style={{
					margin: '80px auto',
					maxWidth: '1440px',
					padding: '0px 30px',
				}}
			>
				{children}
			</main>
		</>
	);
};
