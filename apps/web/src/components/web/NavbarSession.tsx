'use client';

import { useEffect, useState } from 'react';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import animeRumbleRoutes from '@/lib/routes';

import Link from './Link';
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
			<div className='hidden items-center space-x-6 text-lg font-medium md:flex'>
				<Link href={animeRumbleRoutes.login}>Ingresar</Link>
				<Link href={animeRumbleRoutes.register}>Registrarse</Link>
			</div>
		);
	}
};

export default NavbarSession;
