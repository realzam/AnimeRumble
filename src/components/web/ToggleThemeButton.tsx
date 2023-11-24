'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@ui/DropdownMenu';

const ThemeToggle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
	const { setTheme } = useTheme();

	return (
		<div ref={ref} {...props}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild id='theme-toggle'>
					<Button variant='outline' size='icon'>
						<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
						<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
						<span className='sr-only'>Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={() => setTheme('light')}>
						Tema Claro
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						Tema Oscuro
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						Sistema
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
