'use client';

import { RegisterSchema } from '@/schema/auth';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Show, useObservable, useSelector } from '@legendapp/state/react';
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import animeRumbleRoutes from '@/lib/routes';
import { sleep } from '@/lib/utils';
import { Alert, AlertDescription } from '@ui/Alert';
import { Button } from '@ui/Button';
import { CardContent } from '@ui/Card';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';
import InputPassword from '@web/InputPassword';

enableReactComponents();
const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		setFocus,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
	});
	const errorMsg = useObservable('');
	const hasError = useSelector(() => errorMsg.get().length > 0);

	const createUser = trpc.auth.register.useMutation();
	async function onSubmit(values: z.infer<typeof RegisterSchema>) {
		errorMsg.set('');
		console.log('onSubmit');
		await sleep(1000 * 1);
		await createUser.mutate(values, {
			onSuccess(_, variables, __) {
				console.log('onSuccess');
				signIn('credentials', {
					email: variables.email,
					password: variables.password,
					redirect: true,
					callbackUrl: animeRumbleRoutes.home,
				});
			},
			onError(data) {
				console.log('onError', data.message);
				errorMsg.set(data.message);
				setTimeout(() => {
					errorMsg.set('');
				}, 3000);
				setError('email', { type: 'custom', message: data.message });
				setFocus('email');
			},
		});
	}

	return (
		<CardContent className='flex-1 overflow-y-auto p-1'>
			<Show if={hasError} wrap={AnimatePresence}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.7 }}
					exit={{ opacity: 0 }}
				>
					<Alert variant='destructive' className='mb-4 px-3 py-2'>
						<div className='flex items-center'>
							<ExclamationTriangleIcon className='h-4 w-4' />
							<AlertDescription className='ml-4'>
								{errorMsg.get()}
							</AlertDescription>
						</div>
					</Alert>
				</motion.div>
			</Show>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<div className='grid gap-2'>
					<Label htmlFor='fullName' isError={!!errors.name}>
						Nombre completo
					</Label>
					<Input
						autoComplete='name'
						id='fullName'
						placeholder='kirito'
						type='text'
						error={!!errors.name}
						errorMessage={errors.name?.message}
						{...register('name')}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='email' isError={!!errors.email}>
						Correo electrónico
					</Label>
					<Input
						autoComplete='email'
						id='register-email'
						placeholder='m@example.com'
						type='email'
						error={!!errors.email}
						errorMessage={errors.email?.message}
						{...register('email')}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='register-password' isError={!!errors.password}>
						Contraseña
					</Label>
					<InputPassword
						autoComplete='new-password'
						id='register-password'
						type='password'
						error={!!errors.password}
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='confirmPassword' isError={!!errors.confirmPassword}>
						Corfirmar contraseña
					</Label>
					<InputPassword
						autoComplete='new-password'
						id='confirmPassword'
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
