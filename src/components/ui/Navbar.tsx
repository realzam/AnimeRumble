import { Chewy } from 'next/font/google';
import NextLink from 'next/link';

import AnimeRumbleIcon from './AnimeRumbleIcon';
import { HamburgerMenu } from './HamburgerMenu';
import Link from './Link';
import { SheetContent } from './Sheet';
import ToggleThemeButton from './ToggleThemeButton';

import { cn } from '@/lib/utils';

const chewy = Chewy({
	subsets: ['latin'],
	weight: '400',
});

function Navbar() {
	return (
		<header className='sticky top-0 z-40 w-full border-b supports-backdrop-blur:bg-background/60 bg-background/80 backdrop-blur'>
			<div className='container flex items-center h-14'>
				<div className='flex mr-4 '>
					<NextLink className='flex items-center mr-6 space-x-2' href='/'>
						<AnimeRumbleIcon height={24} width={24} />
						<span
							className={cn(
								'hidden  text-xl 2xs:inline-block xs:text-2xl font-bold',
								chewy.className,
							)}
						>
							Anime Rumble
						</span>
					</NextLink>
				</div>
				<div className='flex items-center justify-end flex-1 space-x-2'>
					<nav className='items-center hidden space-x-6 text-lg font-medium sm:flex'>
						<Link href='/login'>Ingresar</Link>
						<Link href='/login'>Registrarse</Link>
					</nav>
					<ToggleThemeButton />
					<HamburgerMenu className='inline-flex sm:hidden'>
						<SheetContent>
							<div className='grid gap-4 py-4'>
								<Link href='/'>Ingresar</Link>
								<Link href='/'>Registrarse</Link>
							</div>
						</SheetContent>
					</HamburgerMenu>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
