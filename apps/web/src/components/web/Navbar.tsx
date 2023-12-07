import React from 'react';
import { Chewy } from 'next/font/google';
import NextLink from 'next/link';

import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import { cn } from '@/lib/utils';
import AnimeRumbleIcon from '@web/AnimeRumbleIcon';

import NavbarLinks from './NavbarLinks';
import NavbarLinksButton from './NavbarLinksButton';
import NavbarSession from './NavbarSession';
import ToggleThemeButton from './ToggleThemeButton';

const chewy = Chewy({ subsets: ['latin'], weight: '400' });

const Navbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	async ({ className, ...props }, ref) => {
		const session = await getAuthSession();
		return (
			<header
				ref={ref}
				className={cn(
					'supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur transition-colors',
					className,
				)}
				{...props}
			>
				<div className='container flex h-14'>
					<div className='flex min-w-[180px] shrink-0 items-center'>
						<NextLink
							href={animeRumbleRoutes.home}
							className='flex w-full items-center space-x-2'
						>
							<AnimeRumbleIcon height={24} width={24} />
							<span
								className={cn(
									'hidden text-xl font-bold 2xs:inline-block xs:text-2xl',
									chewy.className,
								)}
							>
								Anime Rumble
							</span>
						</NextLink>
					</div>
					<div className='flex-1'>
						<div className='hidden h-full w-full items-center justify-center space-x-6 text-lg font-medium md:flex'>
							<NavbarLinks initialSession={session} />
						</div>
					</div>
					<div className='flex w-[180px] shrink-0 items-center justify-end space-x-2'>
						<NavbarSession initialSession={session} />
						<NavbarLinksButton initialSession={session} />
						<ToggleThemeButton />
					</div>
				</div>
			</header>
		);
	},
);
Navbar.displayName = 'Card';

export default Navbar;
