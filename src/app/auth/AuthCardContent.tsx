'use client';

import { useEffect } from 'react';
import { useObservable } from '@legendapp/state/react';
import { useSession } from 'next-auth/react';

import LoginFormContainer from './LoginFormContainer';
import Overlay from './Overlay';
import RegisterFormContainer from './RegisterFormContainer';

interface Props {
	initialActive: boolean;
}

const AuthCardContent = ({ initialActive }: Props) => {
	const active = useObservable(initialActive);
	const session = useSession();
	useEffect(() => {
		console.log('session', session);
	}, [session]);

	return (
		<>
			<RegisterFormContainer active={active} />
			<LoginFormContainer active={active} />
			<Overlay active={active} />
		</>
	);
};

export default AuthCardContent;
