export const metadata = {
	title: 'Auth AnimeRumble',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col'>
			<main className='flex flex-1'>{children}</main>
		</div>
	);
}
