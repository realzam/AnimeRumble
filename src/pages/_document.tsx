import { Html, Head, Main, NextScript } from 'next/document';

import { GTMscript, GTMnoscript } from '@/components/GTMscript';

export default function Document() {
	return (
		<Html lang='es'>
			<GTMscript />
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
			</Head>
			<body>
				<GTMnoscript />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
