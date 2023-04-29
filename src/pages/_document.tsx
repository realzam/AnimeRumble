import { Html, Head, Main, NextScript } from 'next/document';

import { GTMscript } from '@/components/GTMscript';

export default function Document() {
	return (
		<Html lang='es'>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
			</Head>
			<body>
				<GTMscript />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
