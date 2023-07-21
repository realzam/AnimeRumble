import { type ObservablePrimitive } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { ArrowLeft } from 'lineicons-react';

import { Button } from '@/components/ui/Button';

interface Props {
	active: ObservablePrimitive<boolean>;
}
const OverlayRegister = observer(({ active }: Props) => {
	return (
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
				onClick={() => active.toggle()}
				className='group m-3 py-3 px-[80px] font-bold relative tracking-wider capitalize hover:tracking-[3px] active:scale-95 focus:outline-none border-2 border-white dark:border-white dark:text-white text-white dark:bg-[rgba(255,255,255,0.2)] dark:hover:bg-neutral-900/90 bg-[rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out'
			>
				Registerarse
				<ArrowLeft
					className='group-hover:left-10 group-hover:opacity-100 left-[70px] absolute transition-all duration-300 ease-in-out opacity-0'
					fill='currentColor'
				/>
			</Button>
		</>
	);
});

export default OverlayRegister;
