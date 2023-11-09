export const metadata = {
	title: 'Auth AnimeRumble',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen flex-col'>
			<main className='flex flex-1'>{children}</main>
		</div>
	);
}
