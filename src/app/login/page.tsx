'use client';

import { useRef, useState } from 'react';
import { Poppins } from 'next/font/google';

import { ArrowRight, ArrowLeft } from 'lineicons-react';

import AuthForm from './AuthForm';
import LoginForm from './LoginForm';
import Overlay from './Overlay';
import OverlayPanel from './OverlayPanel';
import RegisterForm from './RegisterForm';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const poppins = Poppins({
	subsets: ['latin'],
	weight: '400',
});

const Auth = () => {
	const [active, setActive] = useState(false);

	const renderCount = ++useRef(0).current;
	return (
		<div
			className={cn(
				'bg-slate-100 dark:bg-neutral-900 flex-1 flex justify-center items-center xs:py-6',
				poppins.className,
			)}
		>
			<div>Renders: {renderCount}</div>
			<div className='bg-white dark:bg-neutral-950 xs:shadow-2xl xs:rounded-3xl relative overflow-hidden w-full xs:w-[426px] sm:w-[550px] md:w-[768px] h-[550px] md:h-[500px]'>
				<AuthForm
					active={active}
					activeClassName='md:translate-x-full opacity-1 z-[5] md:animate-show-overlay'
					className='opacity-0 z-[1]'
				>
					<RegisterForm>
						<Button
							type='button'
							onClick={() => setActive((v) => !v)}
							variant='link'
							className='md:hidden group  py-3 px-[80px] font-bold relative transition-all duration-300 ease-in-out'
						>
							Iniciar Sesión
						</Button>
					</RegisterForm>
				</AuthForm>
				<AuthForm
					active={active}
					className='z-[2]'
					activeClassName='translate-x-full focus:outline-none focus-active:outline-none'
				>
					<LoginForm>
						<Button
							type='button'
							onClick={() => setActive((v) => !v)}
							variant='link'
							className='md:hidden group m-3 py-3 px-[80px] font-bold relative transition-all duration-300 ease-in-out'
						>
							Registrarse
						</Button>
					</LoginForm>
				</AuthForm>
				<Overlay active={active}>
					<OverlayPanel
						active={active}
						activeClassName='translate-x-0'
						className='translate-x-[-20%]'
					>
						<>
							<h1 className='m-0 text-[45px] leading-[45px] font-bold -tracking-widest drop-shadow-text'>
								Ohayou
								<br />
								gozaimasu
							</h1>
							<p className='mx-0 mt-5 mb-8 text-sm font-thin tracking-wide rop-shadow-text'>
								Si tienes una cuenta, inicia sesión aquí y diviértete
							</p>
							<Button
								onClick={() => setActive((v) => !v)}
								className='group m-3 py-3 px-[70px] font-bold relative tracking-wider capitalize hover:tracking-[3px] active:scale-95 focus:outline-none border-2 border-white dark:border-white dark:text-white text-white dark:bg-[rgba(255,255,255,0.2)] dark:hover:bg-neutral-900/90 bg-[rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out'
							>
								Iniciar Sesión
								<ArrowRight
									fill='currentColor'
									className='group-hover:right-10 group-hover:opacity-100 right-[70px] absolute transition-all duration-300 ease-in-out opacity-0'
								/>
							</Button>
						</>
					</OverlayPanel>
					<OverlayPanel
						active={active}
						activeClassName='translate-x-[20%]'
						className='right-0 translate-x-0'
					>
						<>
							<h1 className='m-0 text-[45px] leading-[45px] font-bold -tracking-widest drop-shadow-text'>
								Empieza tu
								<br />
								viaje ahora
							</h1>
							<p className='mx-0 mt-5 mb-8 text-sm font-thin tracking-wide rop-shadow-text'>
								Si aún no tienes una cuenta, únete y comienza el viaje
							</p>
							<Button
								onClick={() => setActive((v) => !v)}
								className='group m-3 py-3 px-[80px] font-bold relative tracking-wider capitalize hover:tracking-[3px] active:scale-95 focus:outline-none border-2 border-white dark:border-white dark:text-white text-white dark:bg-[rgba(255,255,255,0.2)] dark:hover:bg-neutral-900/90 bg-[rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out'
							>
								Registerarse
								<ArrowLeft
									className='group-hover:left-10 group-hover:opacity-100 left-[70px] absolute transition-all duration-300 ease-in-out opacity-0'
									fill='currentColor'
								/>
							</Button>
						</>
					</OverlayPanel>
				</Overlay>
			</div>
		</div>
	);
};

export default Auth;
