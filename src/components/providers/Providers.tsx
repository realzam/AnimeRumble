// import SocketProvider from '@/context/socket/SocketProvider';
import { UploadThingProvider } from '@/context/uploadThing/UploadThingProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { TooltipProvider } from '@ui/Tooltip';
import TailwindIndicator from '@web/TailwindIndicator';

// import SocketInicator from '../web/SocketInicator';
import SessionProvider from './SessionProvider';
import ThemeProvider from './ThemeProvider';
import TrpcProvider from './TrpcProvider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TrpcProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<UploadThingProvider>
						<TooltipProvider>{children}</TooltipProvider>
						<ReactQueryDevtools />
						<TailwindIndicator />
					</UploadThingProvider>
				</ThemeProvider>
			</TrpcProvider>
		</SessionProvider>
	);
}
