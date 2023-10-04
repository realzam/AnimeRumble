import TailwindIndicator from '@web/TailwindIndicator';
import {
	SessionProvider,
	ThemeProvider,
	TrpcProvider,
} from '@/components/providers';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TrpcProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					{children}
					<TailwindIndicator />
				</ThemeProvider>
			</TrpcProvider>
		</SessionProvider>
	);
}
