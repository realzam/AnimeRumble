import TailwindIndicator from '@web/TailwindIndicator';
import { ThemeProvider, TrpcProvider } from '@/components/providers';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<TrpcProvider>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				{children}
				<TailwindIndicator />
			</ThemeProvider>
		</TrpcProvider>
	);
}
