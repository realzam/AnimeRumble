import { ThemeProvider } from '@/components/themeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
