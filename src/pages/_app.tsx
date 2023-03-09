import type { AppProps, AppType } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import { darkTheme } from '@/themes';

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Head>
				<title>Create Next App</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>

			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default MyApp;
