import Head from 'next/head';

import { MainLayout } from '@/layouts';

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
			</Head>
			<MainLayout>
				<h1>Hola mundo 2</h1>
			</MainLayout>
		</>
	);
}
