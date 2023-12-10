'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import animeRumbleRoutes from '@/lib/routes';
import Link from '@web/Link';

interface Props {
	initialSession: Session | null;
}

const NavbarLinks = ({ initialSession }: Props) => {
	const path = usePathname();
	const [sessionData, setSessionData] = useState(initialSession);
	const session = useSession();

	useEffect(() => {
		if (session.status !== 'loading') {
			setSessionData(session.data);
		}
	}, [session]);

	return (
		<>
			{sessionData?.user.role === 'admin' && (
				<Link href={animeRumbleRoutes.dashboard}>Dashboard</Link>
			)}
			{path !== '/' && sessionData?.user.role === 'player' && (
				<>
					<Link href={animeRumbleRoutes.activityQuizzes}>Quizzes</Link>
					<Link href={animeRumbleRoutes.activityBingo}>Bingo</Link>
					<Link href={animeRumbleRoutes.activityLoteria}>Loteria</Link>
				</>
			)}
		</>
	);
};

export default NavbarLinks;
