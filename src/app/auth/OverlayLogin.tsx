'use client';

import { type ObservablePrimitive } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';
import { IconArrowRight } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';

interface Props {
	active: ObservablePrimitive<boolean>;
}
enableReactComponents();
const OverlayLogin = ({ active }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					't-0 absolute flex h-full w-1/2 translate-x-[-20%] flex-col items-center justify-center px-10 py-0 text-center transition-transform duration-600 ease-in-out',
					active.get() && 'translate-x-0',
				)
			}
		>
			<h1 className='drop-shadow-text m-0 text-[45px] font-bold leading-[45px] -tracking-widest'>
				Ohayou
				<br />
				gozaimasu
			</h1>
			<p className='rop-shadow-text mx-0 mb-8 mt-5 text-sm font-thin tracking-wide'>
				Si tienes una cuenta, inicia sesión aquí y diviértete
			</p>
			<Button
				onClick={() => active.toggle()}
				className='group relative m-3 border-2 border-white bg-[rgba(255,255,255,0.2)] px-[65px] py-3 font-bold capitalize tracking-wider text-white transition-all duration-300 ease-in-out hover:tracking-[3px] focus:outline-none active:scale-95 dark:border-white dark:bg-[rgba(255,255,255,0.2)] dark:text-white dark:hover:bg-neutral-900/90'
			>
				Iniciar Sesión
				<IconArrowRight
					fill='currentColor'
					className='absolute right-[60px] opacity-0 transition-all duration-300 ease-in-out group-hover:right-[30px] group-hover:opacity-100'
				/>
			</Button>
		</Reactive.div>
	);
};

export default OverlayLogin;
