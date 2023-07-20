import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Props {
	children?: React.ReactNode;
}

function RegisterForm({ children }: Props): JSX.Element {
	return (
		<>
			<h1 className='m-0 mb-4 text-3xl font-bold -tracking-widest text-primary dark:text-secondary'>
				Registro
			</h1>
			<Input
				className='mx-0 my-2 border-none bg-[#eee] dark:bg-neutral-900'
				type='text'
				placeholder='Nombre'
			/>

			<Input
				className='mx-0 my-2 border-none bg-[#eee] dark:bg-neutral-900'
				type='email'
				placeholder='Correo electrónico'
			/>
			<Input
				className='mx-0 my-2 border-none bg-[#eee] dark:bg-neutral-900'
				type='password'
				placeholder='Contraseña'
			/>
			<Input
				className='mx-0 my-2 border-none bg-[#eee] dark:bg-neutral-900'
				type='password'
				placeholder='Confirmar contraseña'
			/>
			<Button
				type='submit'
				variant='gradient'
				className='transition-all duration-300 ease-in-out m-3 px-[80px] font-bold relative tracking-wider hover:tracking-[3px]'
			>
				Registarse
			</Button>
			{children}
		</>
	);
}

export default RegisterForm;
