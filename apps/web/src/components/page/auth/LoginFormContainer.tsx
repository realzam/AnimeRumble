'use client';

import { type ObservablePrimitive } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';

import { cn } from '@/lib/utils';
import { CardDescription, CardHeader, CardTitle } from '@ui/Card';

import LoginForm from './LoginForm';
import SocialAuth from './SocialAuth';

enableReactComponents();
interface Props {
	isRegisterFocus: ObservablePrimitive<boolean>;
}

const LoginFormContainer = ({ isRegisterFocus }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					'absolute left-0 top-0 z-[2] flex h-full w-full flex-col justify-center rounded-xl border border-none bg-card text-card-foreground shadow transition-all duration-1000 ease-in-out md:w-1/2 md:duration-600',
					isRegisterFocus.get() && 'translate-x-full',
				)
			}
		>
			<CardHeader className='space-y-4'>
				<div>
					<CardTitle className='text-2xl'>Iniciar sesión</CardTitle>
					<CardDescription>
						Ingresa los datos de tu cuenta para ingresar
					</CardDescription>
				</div>
				<LoginForm />
				<div className='grid gap-4'>
					<SocialAuth />
				</div>
			</CardHeader>
		</Reactive.div>
	);
};

export default LoginFormContainer;
