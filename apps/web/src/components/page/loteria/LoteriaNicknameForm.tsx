import React from 'react';
import { NickNameForm } from '@/schema/user';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Show, useObservable, useSelector } from '@legendapp/state/react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { sleep } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';

const LoteriaNicknameForm = () => {
	const joinGuestLoteria = trpc.loteria.joinGuestLoteria.useMutation();
	const joinUserLoteria = trpc.loteria.joinUserLoteria.useMutation();
	const updateNickName = trpc.user.updateUser.useMutation();
	const { userInfo, login } = usePlayLoteria();

	const isSubmitting = useObservable(false);
	const errorMsg = useObservable('');
	const user = useSelector(() => userInfo.get());
	const hasError = useSelector(() => errorMsg.get().length > 0);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<z.infer<typeof NickNameForm>>({
		resolver: zodResolver(NickNameForm),
	});
	const updetUserNickName = (nickName: string) => {
		updateNickName.mutate(
			{ nickName },
			{
				onError: (e) => {
					errorMsg.set(e.message);
					setError('nickName', {
						message: e.message,
					});
					setTimeout(() => {
						errorMsg.set('');
					}, 3000);
					isSubmitting.set(false);
				},
				onSuccess: () => {
					joinUserToPlay();
				},
			},
		);
	};

	const joinUserToPlay = () => {
		joinUserLoteria.mutate(undefined, {
			onSuccess: ({ jwt, playerCards, reactive }) => {
				login(jwt, playerCards, reactive);
			},
			onSettled: () => {
				isSubmitting.set(false);
			},
			onError: (e) => {
				errorMsg.set(e.message);
				setError('nickName', {
					message: e.message,
				});
				setTimeout(() => {
					errorMsg.set('');
				}, 3000);
				isSubmitting.set(false);
			},
		});
	};

	const joinGuestToPlay = (nickName: string) => {
		joinGuestLoteria.mutate(
			{ nickName },
			{
				onSuccess: ({ jwt, playerCards, reactive }) => {
					login(jwt, playerCards, reactive);
				},
				onSettled: () => {
					isSubmitting.set(false);
				},
				onError: (e) => {
					errorMsg.set(e.message);
					setError('nickName', {
						message: e.message,
					});
					setTimeout(() => {
						errorMsg.set('');
					}, 3000);
					isSubmitting.set(false);
				},
			},
		);
	};
	const onSubmit = async ({ nickName }: z.infer<typeof NickNameForm>) => {
		isSubmitting.set(true);
		errorMsg.set('');
		await sleep(1000);
		if (user && user.userId) {
			console.log('update user nickname');
			updetUserNickName(nickName);
		} else {
			console.log('logging guestuser');
			joinGuestToPlay(nickName);
		}
	};

	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] items-center justify-center'>
			<Card className='w-[370px] transition-all duration-300'>
				<CardHeader className='pb-0'>
					<CardTitle>Crea un Nickname</CardTitle>
					<CardDescription>
						Sera visible para los demas jugadores
					</CardDescription>
				</CardHeader>
				<Show
					if={hasError}
					wrap={AnimatePresence}
					else={<div className='m-2 h-2' />}
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.7 }}
						exit={{ opacity: 0 }}
					>
						<Alert variant='destructive' className='m-2 w-[350px]'>
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent>
						{/* <CardHeader></CardHeader> */}
						<div className='grid gap-2'>
							<Label htmlFor='nickname'>Nickname</Label>
							<Input
								autoComplete='nickname'
								id='nickname'
								placeholder='MechaPilot'
								type='text'
								error={!!errors.nickName}
								errorMessage={errors.nickName?.message}
								{...register('nickName')}
								disabled={isSubmitting.get()}
							/>
						</div>

						<ButtonGradientLoading
							type='submit'
							isLoading={isSubmitting}
							className='mt-3'
						>
							Guardar
						</ButtonGradientLoading>
					</CardContent>
				</form>
			</Card>
		</div>
	);
};

export default LoteriaNicknameForm;
