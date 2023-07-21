import { type ObservablePrimitive } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import Link from '@/components/ui/Link';

interface Props {
	active: ObservablePrimitive<boolean>;
}

const LoginForm = observer(({ active }: Props): JSX.Element => {
	return (
		<>
			<h1 className='m-0 mb-4 text-3xl font-bold -tracking-widest text-primary dark:text-secondary'>
				Iniciar Sesión
			</h1>
			<Input
				className='mx-0 my-2 bg-[#eee] dark:bg-neutral-900 border-none'
				type='email'
				placeholder='Correo electrónico'
			/>
			<Input
				className='mx-0 my-2 bg-[#eee] dark:bg-neutral-900 border-none'
				type='password'
				placeholder='Contraseña'
			/>
			<div className='flex items-center justify-around w-full h-12'>
				<div className='flex items-center justify-center'>
					<Checkbox
						id='checkbox'
						className='accent-slate-700 mx-0 my-2 border-none bg-[#eee] dark:bg-neutral-900 w-4 h-4'
					/>
					<Label className='pl-1' htmlFor='checkbox'>
						Recordarme
					</Label>
				</div>
				<div>
					<Link className='mx-0 my-4 text-sm' href='#'>
						¿Se te olvido la contraseña?
					</Link>
				</div>
			</div>
			<Button
				variant='gradient'
				className='transition-all duration-300 ease-in-out m-3 px-[65px] font-bold relative tracking-wider hover:tracking-[3px]'
			>
				iniciar sesión
			</Button>
			<Button
				type='button'
				onClick={() => active.toggle()}
				variant='link'
				className='md:hidden group m-3 py-3 px-[80px] font-bold relative transition-all duration-300 ease-in-out'
			>
				Registrarse
			</Button>
		</>
	);
});

export default LoginForm;
