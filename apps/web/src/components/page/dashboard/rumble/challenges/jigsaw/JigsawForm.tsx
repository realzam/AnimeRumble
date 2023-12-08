'use client';

import { trpc } from '@/trpc/client/client';
import {
	Memo,
	Show,
	useComputed,
	useObservable,
	useSelector,
} from '@legendapp/state/react';

import { useToast } from '@/hooks/useToast';
import { Button } from '@ui/Button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@ui/Card';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';
import { ReactiveInput } from '@/components/web/ReactiveInput';

const JigsawForm = () => {
	const { toast } = useToast();
	const { refetch } = trpc.rumble.getJigsaws.useQuery();
	const url = useObservable('');
	const pid = useObservable('');
	const isSubmmiting = useObservable(false);
	const addJigsaw = trpc.rumble.addJigsaw.useMutation();
	const show = useComputed(() => {
		try {
			const searchParams = new URLSearchParams(url.get().trim());
			const pidValue = searchParams.get('pid');
			const valid = url
				.get()
				.trim()
				.startsWith('https://www.jigsawplanet.com/?rc=play');
			if (valid && pid) {
				pid.set(pidValue);
				console.log('searchParams', searchParams.get('pid'));
				return true;
			}
		} catch (error) {
			return false;
		}
		return false;
	});
	const disable = useSelector(() => !show.get());

	return (
		<Card className='mx-auto grid w-[80%] grid-cols-2'>
			<div className='col-span-1'>
				<CardHeader>
					<CardTitle>Agregar a galería</CardTitle>
					<CardDescription>
						Información para el desafio de galería
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CardTitle>Pasos:</CardTitle>
					<div className='my-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
						<span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
						<div className='space-y-2'>
							<p className='text-sm font-medium leading-none'>
								Crear un rompecabezas en JigsawPlanet
							</p>
							<Button
								disabled={isSubmmiting.get()}
								variant='secondary'
								onClick={() => {
									window.open('https://www.jigsawplanet.com/?rc=createpuzzle');
								}}
							>
								Ir a JigsawPlanet
							</Button>
						</div>
					</div>

					<div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
						<span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
						<div className='space-y-2'>
							<p className='text-sm font-medium leading-none'>
								Copiar el link del rompecabezas y pegalo aqui:
							</p>
							<ReactiveInput
								disabled={isSubmmiting.get()}
								value={url}
								placeholder='https://www.jigsawplanet.com/?rc=play&pid='
							/>
						</div>
					</div>
					<ButtonGradientLoading
						isLoading={isSubmmiting}
						disabled={disable}
						onClick={() => {
							isSubmmiting.set(true);

							addJigsaw.mutate(
								{
									pid: pid.get(),
								},
								{
									onSuccess: () => {
										refetch();
										url.set('');
									},
									onError: (error) => {
										toast({
											variant: 'destructive',
											title: 'Uh oh! No se pudo subir el el rompecabezas.',
											description: error.message,
										});
									},
									onSettled: () => {
										isSubmmiting.set(false);
									},
								},
							);
						}}
					>
						Agregar
					</ButtonGradientLoading>
				</CardContent>
			</div>
			<div className='col-span-1 overflow-hidden rounded-sm p-6'>
				<Show if={show}>
					<Memo>
						{() => (
							<>
								<iframe
									className='h-full w-full'
									src={`https://www.jigsawplanet.com/?rc=play&pid=${pid.get()}&view=iframe`}
									allow='fullscreen'
								/>
							</>
						)}
					</Memo>
				</Show>
			</div>
		</Card>
	);
};

export default JigsawForm;
