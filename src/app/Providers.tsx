import TailwindIndicator from '@web/TailwindIndicator';
import ThemeProvider from '@web/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
			{children}
			<TailwindIndicator />
		</ThemeProvider>
	);
}
