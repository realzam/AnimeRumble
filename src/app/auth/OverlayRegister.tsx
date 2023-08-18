'use client';

import { type ObservablePrimitive } from '@legendapp/state';
import { IconArrowLeft } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';

interface Props {
	active: ObservablePrimitive<boolean>;
}

const OverlayRegister = ({ active }: Props) => {
	return (
		<div
			className={cn(
				't-0 absolute right-0 flex h-full w-1/2 translate-x-0 flex-col items-center justify-center px-10 py-0 text-center transition-transform duration-600 ease-in-out',
				active.get() && 'translate-x-[20%]',
			)}
		>
			<h1 className='drop-shadow-text m-0 text-[45px] font-bold leading-[45px] -tracking-widest'>
				Empieza tu
				<br />
				viaje ahora
			</h1>
			<p className='rop-shadow-text mx-0 mb-8 mt-5 text-sm font-thin tracking-wide'>
				Si aún no tienes una cuenta, únete y comienza el viaje
			</p>
			<Button
				onClick={() => active.toggle()}
				className='group relative m-3 border-2 border-white bg-[rgba(255,255,255,0.2)] px-[80px] py-3 font-bold capitalize tracking-wider text-white transition-all duration-300 ease-in-out hover:tracking-[3px] focus:outline-none active:scale-95 dark:border-white dark:bg-[rgba(255,255,255,0.2)] dark:text-white dark:hover:bg-neutral-900/90'
			>
				Registerarse
				<IconArrowLeft
					className='absolute left-[70px] opacity-0 transition-all duration-300 ease-in-out group-hover:left-10 group-hover:opacity-100'
					fill='currentColor'
				/>
			</Button>
		</div>
	);
};

export default OverlayRegister;
