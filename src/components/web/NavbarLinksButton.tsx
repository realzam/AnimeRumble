'use client';

import { useEffect, useState } from 'react';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import animeRumbleRoutes from '@/lib/routes';
import { Separator } from '@ui/Separator';
import { SheetContent } from '@ui/Sheet';
import Link from '@web/Link';

import { HamburgerMenu } from './HamburgerMenu';
import NavbarLinks from './NavbarLinks';

interface Props {
	initialSession: Session | null;
}

const NavbarLinksButton = ({ initialSession }: Props) => {
	const [sessionData, setSessionData] = useState(initialSession);
	const session = useSession();

	useEffect(() => {
		if (session.status !== 'loading') {
			setSessionData(session.data);
		}
	}, [session]);

	return (
		<HamburgerMenu className='flex md:hidden'>
			<SheetContent>
				<div className='grid gap-4 py-4'>
					{!sessionData?.user && (
						<>
							<Link href={animeRumbleRoutes.login}>Ingresar</Link>
							<Link href={animeRumbleRoutes.register}>Registrarse</Link>
							<Separator />
						</>
					)}
					<NavbarLinks initialSession={initialSession} />
				</div>
			</SheetContent>
		</HamburgerMenu>
	);
};

export default NavbarLinksButton;
