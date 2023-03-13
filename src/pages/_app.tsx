import { useEffect, useMemo, useState } from 'react';
import type { AppProps, AppType } from 'next/app';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

import { AuthProvider, UIProvider } from '@/context';
import { IThemes } from '@/interfaces';
import { darkTheme, lightTheme } from '@/themes';
import '../styles/globals.css';
const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	const [mode, setMode] = useState<IThemes>('light');

	const theme = useMemo(
		() => (mode === 'dark' ? darkTheme : lightTheme),
		[mode],
	);

	const toggleColorMode = useMemo(
		() => () => {
			setMode((prevMode: IThemes) => {
				const newTheme = prevMode === 'light' ? 'dark' : 'light';
				Cookies.set('theme', newTheme);
				return newTheme;
			});
		},
		[],
	);

	useEffect(() => {
		const cookieTheme = Cookies.get('theme') || 'light';
		if (cookieTheme === 'dark') {
			setMode('dark');
			return;
		}
		Cookies.set('theme', 'light');
	}, []);

	return (
		<AuthProvider>
			<UIProvider toggleColorMode={toggleColorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Head>
						<title>Anime Rumble</title>
						<meta
							name='viewport'
							content='width=device-width, initial-scale=1'
						/>
					</Head>

					<Component {...pageProps} />
				</ThemeProvider>
			</UIProvider>
		</AuthProvider>
	);
};

export default MyApp;
