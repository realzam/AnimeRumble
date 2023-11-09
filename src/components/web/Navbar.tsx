import React from 'react';
import { Chewy } from 'next/font/google';
import NextLink from 'next/link';

import { getAuthSession } from '@/lib/nextauth';
import { cn } from '@/lib/utils';
import { SheetContent } from '@ui/Sheet';
import AnimeRumbleIcon from '@web/AnimeRumbleIcon';
import Link from '@web/Link';

import { HamburgerMenu } from './HamburgerMenu';
import ToggleThemeButton from './ToggleThemeButton';
import UserAccountNav from './UserAccountNav';

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
					<div className='mr-4 flex '>
						<NextLink className='mr-6 flex items-center space-x-2' href='/'>
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

					<div className='flex flex-1 items-center justify-end space-x-2'>
						{session?.user ? (
							<UserAccountNav user={session.user} />
						) : (
							<>
								<nav className='mr-3 hidden items-center space-x-6 text-lg font-medium sm:flex'>
									<Link href='/auth/login'>Ingresar</Link>
									<Link href='/auth/register'>Registrarse</Link>
								</nav>
								<HamburgerMenu className='inline-flex sm:hidden'>
									<SheetContent>
										<div className='grid gap-4 py-4'>
											<Link href='/auth/login'>Ingresar</Link>
											<Link href='/auth/register'>Registrarse</Link>
										</div>
									</SheetContent>
								</HamburgerMenu>
							</>
						)}
						<ToggleThemeButton />
					</div>
				</div>
			</header>
		);
	},
);
Navbar.displayName = 'Card';

export default Navbar;
