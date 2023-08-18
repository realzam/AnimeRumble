'use client';

import { enableLegendStateReact, useObservable } from '@legendapp/state/react';

import LoginForm from './LoginForm';
import Overlay from './Overlay';
import RegisterForm from './RegisterForm';

interface Props {
	initialActive: boolean;
}

enableLegendStateReact();
const AuthCardContent = ({ initialActive }: Props) => {
	const active = useObservable(initialActive);
	return (
		<>
			<RegisterForm active={active} />
			<LoginForm active={active} />
			<Overlay active={active} />
		</>
	);
};

export default AuthCardContent;
