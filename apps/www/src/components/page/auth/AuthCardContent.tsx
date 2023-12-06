'use client';

import { useObservable } from '@legendapp/state/react';

import LoginFormContainer from './LoginFormContainer';
import Overlay from './Overlay';
import RegisterFormContainer from './RegisterFormContainer';

interface Props {
	isRegisterFocus?: boolean;
}
const AuthCardContent = ({ isRegisterFocus = false }: Props) => {
	const active = useObservable(isRegisterFocus);

	return (
		<>
			<RegisterFormContainer isRegisterFocus={active} />
			<LoginFormContainer isRegisterFocus={active} />
			<Overlay isRegisterFocus={active} />
		</>
	);
};

export default AuthCardContent;
