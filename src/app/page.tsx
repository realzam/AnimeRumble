'use client';

import { useTheme } from 'next-themes';

export default function Home() {
	const { resolvedTheme } = useTheme();

	return (
		<>
			hola 2
			<span className='text-gray-700 dark:text-gray-200 p-1 sm:px-3 sm:py-2 '>
				Current theme: {resolvedTheme}
			</span>
		</>
	);
}
