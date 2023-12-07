'use client';

import { type ObservablePrimitive } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';

import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';

enableReactComponents();
interface Props {
	isRegisterFocus: ObservablePrimitive<boolean>;
}

const OverlayLogin = ({ isRegisterFocus }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					't-0 absolute flex h-full w-1/2 translate-x-[-20%] flex-col items-center justify-center px-10 py-0 text-center transition-transform duration-600 ease-in-out',
					isRegisterFocus.get() && 'translate-x-0',
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
				onClick={() => isRegisterFocus.toggle()}
				className='border-2 border-white bg-[rgba(255,255,255,0.2)] px-[80px] py-3 text-base font-bold transition-all duration-300 ease-in-out hover:bg-pink-500/30'
			>
				Iniciar Sesión
			</Button>
		</Reactive.div>
	);
};

export default OverlayLogin;
