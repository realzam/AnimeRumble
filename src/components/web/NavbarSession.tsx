'use client';

import { useEffect, useState } from 'react';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import animeRumbleRoutes from '@/lib/routes';
import { SheetContent } from '@ui/Sheet';
import Link from '@web/Link';

import { HamburgerMenu } from './HamburgerMenu';
import UserAccountNav from './UserAccountNav';

interface Props {
	initialSession: Session | null;
}
const NavbarSession = ({ initialSession }: Props) => {
	const [sessionData, setSessionData] = useState(initialSession);
	const session = useSession();
	useEffect(() => {
		if (session.status !== 'loading') {
			setSessionData(session.data);
		}
	}, [session]);

	if (sessionData?.user) {
		return <UserAccountNav user={sessionData.user} />;
	} else {
		return (
			<>
				<nav className='mr-3 hidden items-center space-x-6 text-lg font-medium sm:flex'>
					<Link href={animeRumbleRoutes.login}>Ingresar</Link>
					<Link href={animeRumbleRoutes.register}>Registrarse</Link>
				</nav>
				<HamburgerMenu className='inline-flex sm:hidden'>
					<SheetContent>
						<div className='grid gap-4 py-4'>
							<Link href={animeRumbleRoutes.login}>Ingresar</Link>
							<Link href={animeRumbleRoutes.register}>Registrarse</Link>
						</div>
					</SheetContent>
				</HamburgerMenu>
			</>
		);
	}
};

export default NavbarSession;
