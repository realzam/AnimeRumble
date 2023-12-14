'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useObservable } from '@legendapp/state/react';
import { useSession } from 'next-auth/react';

import animeRumbleRoutes from '@/lib/routes';

import { AlertNikcName } from './AlertNickName';
import LoginFormContainer from './LoginFormContainer';
import Overlay from './Overlay';
import RegisterFormContainer from './RegisterFormContainer';

interface Props {
	isRegisterFocus?: boolean;
	openAlertNikNameProps?: boolean;
}
const AuthCardContent = ({ isRegisterFocus = false }: Props) => {
	const searchParams = useSearchParams();
	const session = useSession();
	const router = useRouter();

	const active = useObservable(isRegisterFocus);
	const [openAlertNikName, setOpenAlertNikName] = useState(false);

	const redirectAdmin = useMemo(() => {
		let callbackUrl = searchParams?.get('callbackUrl');
		if (!callbackUrl) {
			callbackUrl = animeRumbleRoutes.dashboard;
		}
		return decodeURIComponent(callbackUrl);
	}, [searchParams]);

	const redirectPlayer = useMemo(() => {
		let callbackUrl = searchParams?.get('callbackUrl');
		if (!callbackUrl) {
			callbackUrl = animeRumbleRoutes.home;
		}
		return decodeURIComponent(callbackUrl);
	}, [searchParams]);

	useEffect(() => {
		if (session.status == 'authenticated') {
			console.log('account is loggin from AuthCardContent');
			if (session.data.user.nickName) {
				console.log(
					'account has nickname AuthCardContent',
					session.data.user.nickName,
					' redirect to nextpage',
				);
				if (session.data.user.role === 'admin') {
					router.replace(redirectAdmin);
				} else {
					router.replace(redirectPlayer);
				}
			} else {
				console.log(
					'account not have nickname AuthCardContent,showing alertNickname',
				);
				setOpenAlertNikName(true);
			}
		}
	}, [router, searchParams, session, redirectAdmin, redirectPlayer]);

	return (
		<>
			<AlertNikcName
				open={openAlertNikName}
				onSave={() => {
					if (session.data!.user.role === 'admin') {
						router.replace(redirectAdmin);
					} else {
						router.replace(redirectPlayer);
					}
					setOpenAlertNikName(false);
				}}
			/>
			<RegisterFormContainer isRegisterFocus={active} />
			<LoginFormContainer isRegisterFocus={active} />
			<Overlay isRegisterFocus={active} />
		</>
	);
};

export default AuthCardContent;
