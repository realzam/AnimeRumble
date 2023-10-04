import { type ObservablePrimitive } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';

import { cn } from '@/lib/utils';
import { CardDescription, CardHeader, CardTitle } from '@ui/Card';

import LoginForm from './LoginForm';
import SocialAuth from './SocialAuth';

interface Props {
	active: ObservablePrimitive<boolean>;
}
enableReactComponents();

const LoginFormContainer = ({ active }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					'absolute left-0 top-0 z-[2] flex h-full w-full flex-col justify-center rounded-xl border border-none bg-card text-card-foreground shadow transition-all duration-1000 ease-in-out md:w-1/2 md:duration-600',
					active.get() && 'translate-x-full',
				)
			}
		>
			<CardHeader className='space-y-1'>
				<CardTitle className='text-2xl'>Iniciar sesión</CardTitle>
				<CardDescription>
					Enter your email below to create your account
				</CardDescription>
				<div className='grid gap-4'>
					<SocialAuth />
				</div>
			</CardHeader>
			<LoginForm />
		</Reactive.div>
	);
};

export default LoginFormContainer;
