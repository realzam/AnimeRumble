import { NickNameForm } from '@/schema/user';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Show, useObservable, useSelector } from '@legendapp/state/react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Alert, AlertDescription } from '@/components/ui/Alert';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface Props {
	open: boolean;
	onSave: () => void;
}
export function AlertNikcName({ open, onSave }: Props) {
	const updateNickName = trpc.user.updateUser.useMutation();
	const errorMsg = useObservable('');
	const hasError = useSelector(() => errorMsg.get().length > 0);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof NickNameForm>>({
		resolver: zodResolver(NickNameForm),
	});
	const execute = (values: z.infer<typeof NickNameForm>) => {
		return new Promise<void>((resolve) => {
			updateNickName.mutate(
				{ ...values },
				{
					onError: (e) => {
						errorMsg.set(e.message);
						setTimeout(() => {
							errorMsg.set('');
						}, 3000);
					},
					onSuccess: () => {
						onSave();
					},
					onSettled: () => {
						resolve();
					},
				},
			);
		});
	};
	const onSubmit = async (values: z.infer<typeof NickNameForm>) => {
		await execute(values);
	};
	return (
		<AlertDialog open={open}>
			<AlertDialogContent asChild>
				<form onSubmit={handleSubmit(onSubmit)}>
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

					<AlertDialogHeader>
						<AlertDialogTitle>Escribe un NickName</AlertDialogTitle>
						<AlertDialogDescription>
							El NickName se muestra en la realizacion de las actividades
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className='grid gap-2'>
						<Label htmlFor='nickname'>NickName</Label>
						<Input
							autoComplete='nickname'
							id='nickname'
							placeholder='MechaPilot'
							type='text'
							error={!!errors.nickName}
							errorMessage={errors.nickName?.message}
							{...register('nickName')}
						/>
					</div>
					<AlertDialogFooter>
						<AlertDialogAction type='submit' disabled={isSubmitting}>
							Guardar
						</AlertDialogAction>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
