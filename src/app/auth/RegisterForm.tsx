'use client';

import { RegisterSchema } from '@/schema/auth';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Show } from '@legendapp/state/react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { sleep } from '@/lib/utils';
import { Button } from '@ui/Button';
import { CardContent } from '@ui/Card';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';
import ReactiveInputPassword from '@/components/ui/ReactiveInputPassword';

enableReactComponents();
const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
	});

	const createUser = trpc.auth.register.useMutation();
	async function onSubmit(values: z.infer<typeof RegisterSchema>) {
		console.log('onSubmit');
		await sleep(1000 * 1);
		await createUser.mutate(values, {
			onSuccess(data, variables, context) {
				console.log('onSuccess');
				console.log(data);
				console.log(variables);
				console.log(context);
			},
		});
	}

	return (
		<CardContent className='flex-1 overflow-y-auto'>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<div className='grid gap-2'>
					<Label htmlFor='fullName' error={!!errors.name}>
						Nombre completo
					</Label>
					<Input
						autoComplete='name'
						id='fullName'
						// name='fullName'
						placeholder='kirito'
						type='text'
						error={!!errors.name}
						errorMessage={errors.name?.message}
						{...register('name')}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='email' error={!!errors.email}>
						Correo electrónico
					</Label>
					<Input
						autoComplete='email'
						id='email'
						// name='email'
						placeholder='m@example.com'
						type='email'
						error={!!errors.email}
						errorMessage={errors.email?.message}
						{...register('email')}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='register-password' error={!!errors.password}>
						Contraseña
					</Label>
					<ReactiveInputPassword
						autoComplete='new-password'
						id='register-password'
						// name='password'
						type='password'
						error={!!errors.password}
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='cpassword' error={!!errors.confirmPassword}>
						Corfirmar contraseña
					</Label>
					<ReactiveInputPassword
						autoComplete='new-password'
						id='cpassword'
						// name='password'
						type='password'
						error={!!errors.confirmPassword}
						errorMessage={errors.confirmPassword?.message}
						{...register('confirmPassword')}
					/>
				</div>
				<Button
					className='w-full'
					variant='gradient'
					type='submit'
					disabled={isSubmitting}
				>
					<Show if={isSubmitting} else={<>Crear cuenta</>}>
						<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
						Espere porfavor
					</Show>
				</Button>
			</form>
		</CardContent>
	);
};

export default RegisterForm;
