'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@ui/Button';

interface Props {
	text: string;
}

const SingInButton = ({ text }: Props) => {
	return (
		<Button
			onClick={() => {
				signIn('google').catch(console.error);
			}}
		>
			{text}
		</Button>
	);
};

export default SingInButton;
