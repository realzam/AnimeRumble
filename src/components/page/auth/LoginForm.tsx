'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Show, useObservable, useSelector } from '@legendapp/state/react';
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import animeRumbleRoutes from '@/lib/routes';
import { sleep } from '@/lib/utils';
import { Alert, AlertDescription } from '@ui/Alert';
import { Button } from '@ui/Button';
import { CardContent } from '@ui/Card';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';
import ReactiveInputPassword from '@web/InputPassword';

enableReactComponents();
const LoginForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
	});
	const errorMsg = useObservable('');
	const hasError = useSelector(() => errorMsg.get().length > 0);
	const session = useSession();

	useEffect(() => {
		if (session.status == 'authenticated') {
			let callbackUrl = searchParams?.get('callbackUrl');
			if (!callbackUrl) {
				callbackUrl =
					session.data.user.role == 'admin'
						? animeRumbleRoutes.dashboard
						: animeRumbleRoutes.home;
			}
			const urlDecoaded = decodeURIComponent(callbackUrl);

			router.replace(urlDecoaded);
		}
	}, [router, searchParams, session]);

	async function onSubmit(values: z.infer<typeof LoginSchema>) {
		errorMsg.set('');
		await sleep(1000 * 1);
		const res = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		});
		if (res) {
			if (res.error) {
				errorMsg.set(res.error);
				setTimeout(() => {
					errorMsg.set('');
				}, 3000);
			}
		}
	}

	return (
		<CardContent className=''>
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
							{/* <AlertTitle>Error</AlertTitle> */}
							<AlertDescription className='ml-4'>
								{errorMsg.get()}
							</AlertDescription>
						</div>
					</Alert>
				</motion.div>
			</Show>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<div className='grid gap-2'>
					<Label htmlFor='email'>Email</Label>
					<Input
						autoComplete='email'
						id='email'
						placeholder='m@example.com'
						type='email'
						error={!!errors.email}
						errorMessage={errors.email?.message}
						{...register('email')}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='login-password'>Password</Label>
					<ReactiveInputPassword
						autoComplete='new-password'
						id='login-password'
						// name='password'
						type='password'
						error={!!errors.password}
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
				</div>
				<Button
					className='w-full'
					variant='gradient'
					type='submit'
					disabled={isSubmitting}
				>
					<Show if={isSubmitting} else={<>Iniciar sesión</>}>
						<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
						Espere porfavor
					</Show>
				</Button>
			</form>
		</CardContent>
	);
};

export default LoginForm;
