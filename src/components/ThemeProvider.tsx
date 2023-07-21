'use client';

// import { useEffect, useState } from 'react';

// import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import { type ThemeProviderProps } from 'next-themes/dist/types';

// export function ThemeProvider({ children }: ThemeProviderProps) {
// 	const [mounted, setMounted] = useState(false);

// 	useEffect(() => setMounted(true), []);
// 	return (
// 		<NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
// 			{mounted && children}
// 		</NextThemesProvider>
// 	);
// }

import * as React from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
