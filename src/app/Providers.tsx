import TailwindIndicator from '@web/TailwindIndicator';
import {
	ReactQuery,
	SessionProvider,
	ThemeProvider,
	TrpcProvider,
} from '@/components/providers';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TrpcProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<ReactQuery>
						{children}
						<TailwindIndicator />
					</ReactQuery>
				</ThemeProvider>
			</TrpcProvider>
		</SessionProvider>
	);
}
