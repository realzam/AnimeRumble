import { UploadThingProvider } from '@/context/uploadThing/UploadThingProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import TailwindIndicator from '@web/TailwindIndicator';

import SessionProvider from './SessionProvider';
import ThemeProvider from './ThemeProvider';
import TrpcProvider from './TrpcProvider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TrpcProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<UploadThingProvider>
						{children}
						<ReactQueryDevtools />
						<TailwindIndicator />
					</UploadThingProvider>
				</ThemeProvider>
			</TrpcProvider>
		</SessionProvider>
	);
}
