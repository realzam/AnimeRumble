import React from 'react';
import { Chewy } from 'next/font/google';
import NextLink from 'next/link';

import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import { cn } from '@/lib/utils';
import AnimeRumbleIcon from '@web/AnimeRumbleIcon';
import Link from '@web/Link';

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
				<div className='container flex h-14 items-center'>
					<div className='mr-4 flex shrink-0'>
						<NextLink
							className='mr-6 flex items-center space-x-2'
							href={animeRumbleRoutes.home}
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
					<div className='hidden flex-1 justify-center sm:flex'>
						<nav className='items-center space-x-6 text-lg font-medium'>
							{session?.user.role === 'admin' && (
								<Link href={animeRumbleRoutes.dashboard}>Dashboard</Link>
							)}
							<Link href={animeRumbleRoutes.activityBingo}>Bingo</Link>
							<Link href={animeRumbleRoutes.activityLoteria}>Loteria</Link>
						</nav>
					</div>

					<div className='flex shrink-0 items-center justify-end space-x-2'>
						<NavbarSession initialSession={session} />
						<ToggleThemeButton />
					</div>
				</div>
			</header>
		);
	},
);
Navbar.displayName = 'Card';

export default Navbar;
