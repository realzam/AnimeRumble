import { Chewy } from 'next/font/google';

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
		<header className='supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur'>
			<div className='container flex h-14 items-center'>
				<div className='mr-4 flex '>
					<a className='mr-6 flex items-center space-x-2' href='/'>
						<AnimeRumbleIcon height={24} width={24} />
						<span
							className={cn(
								'hidden  text-xl 2xs:inline-block xs:text-2xl font-bold',
								chewy.className,
							)}
						>
							Anime Rumble
						</span>
					</a>
				</div>
				<div className='flex flex-1 items-center space-x-2 justify-end'>
					<nav className='hidden sm:flex items-center space-x-6 text-lg font-medium'>
						<Link href='/'>Ingresar</Link>
						<Link href='/'>Registrarse</Link>
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
