'use client';

import { Poppins } from 'next/font/google';

import { useObservable, enableLegendStateReact } from '@legendapp/state/react';

import AuthForm from './AuthForm';
import LoginForm from './LoginForm';
import Overlay from './Overlay';
import OverlayLogin from './OverlayLogin';
import OverlayPanel from './OverlayPanel';
import OverlayRegister from './OverlayRegister';
import RegisterForm from './RegisterForm';

import { cn } from '@/lib/utils';

enableLegendStateReact();
const poppins = Poppins({
	subsets: ['latin'],
	weight: '400',
});

const Auth = () => {
	const active = useObservable(false);
	return (
		<div
			className={cn(
				'bg-slate-100 dark:bg-neutral-900 flex-1 flex justify-center items-center xs:py-6',
				poppins.className,
			)}
		>
			<div className='bg-white dark:bg-neutral-950 xs:shadow-2xl xs:rounded-3xl relative overflow-hidden w-full xs:w-[426px] sm:w-[550px] md:w-[768px] h-[550px] md:h-[500px]'>
				<AuthForm
					active={active}
					activeClassName='md:translate-x-full opacity-1 z-[5] md:animate-show-overlay'
					className='opacity-0 z-[1]'
				>
					<RegisterForm active={active} />
				</AuthForm>
				<AuthForm
					active={active}
					className='z-[2]'
					activeClassName='translate-x-full focus:outline-none focus-active:outline-none'
				>
					<LoginForm active={active} />
				</AuthForm>

				<Overlay active={active}>
					<OverlayPanel
						active={active}
						activeClassName='translate-x-0'
						className='translate-x-[-20%]'
					>
						<OverlayLogin active={active} />
					</OverlayPanel>
					<OverlayPanel
						active={active}
						activeClassName='translate-x-[20%]'
						className='right-0 translate-x-0'
					>
						<OverlayRegister active={active} />
					</OverlayPanel>
				</Overlay>
			</div>
		</div>
	);
};

export default Auth;
