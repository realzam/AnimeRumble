'use client';

import { useObservable } from '@legendapp/state/react';

import LoginForm from './LoginForm';
import Overlay from './Overlay';
import RegisterFormContainer from './RegisterFormContainer';

interface Props {
	initialActive: boolean;
}

const AuthCardContent = ({ initialActive }: Props) => {
	const active = useObservable(initialActive);
	return (
		<>
			<RegisterFormContainer active={active} />
			<LoginForm active={active} />
			<Overlay active={active} />
		</>
	);
};

export default AuthCardContent;
