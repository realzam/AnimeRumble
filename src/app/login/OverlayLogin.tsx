import { type ObservablePrimitive } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { ArrowRight } from 'lineicons-react';

import { Button } from '@/components/ui/Button';

interface Props {
	active: ObservablePrimitive<boolean>;
}
const OverlayLogin = observer(({ active }: Props) => {
	return (
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
				onClick={() => active.toggle()}
				className='group m-3 py-3 px-[70px] font-bold relative tracking-wider capitalize hover:tracking-[3px] active:scale-95 focus:outline-none border-2 border-white dark:border-white dark:text-white text-white dark:bg-[rgba(255,255,255,0.2)] dark:hover:bg-neutral-900/90 bg-[rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out'
			>
				Iniciar Sesión
				<ArrowRight
					fill='currentColor'
					className='group-hover:right-10 group-hover:opacity-100 right-[70px] absolute transition-all duration-300 ease-in-out opacity-0'
				/>
			</Button>
		</>
	);
});

export default OverlayLogin;
