'use client';

import { type ObservablePrimitive } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';

import { cn } from '@/lib/utils';
import { CardDescription, CardHeader, CardTitle } from '@ui/Card';

import RegisterForm from './RegisterForm';
import SocialAuth from './SocialAuth';

enableReactComponents();
interface Props {
	isRegisterFocus: ObservablePrimitive<boolean>;
}

const RegisterFormContainer = ({ isRegisterFocus }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					'absolute left-0 top-0 z-[1] flex h-full w-full flex-col rounded-xl border border-none bg-card text-card-foreground opacity-0 shadow transition-all duration-1000 ease-in-out xs:justify-center md:w-1/2 md:duration-600',
					isRegisterFocus.get() &&
						'opacity-1 z-[5] md:translate-x-full md:animate-show-overlay',
				)
			}
		>
			<CardHeader className='shrink-0 space-y-3'>
				<div>
					<CardTitle className='text-2xl'>Crear cuenta</CardTitle>
					<CardDescription>
						Ingresa tus datos para crear tu cuenta
					</CardDescription>
				</div>
				<RegisterForm />
				<SocialAuth />
			</CardHeader>
		</Reactive.div>
	);
};

export default RegisterFormContainer;
