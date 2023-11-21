import { useEffect } from 'react';
import { FormLoteriaCardSchema } from '@/schema/loteria';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Computed, useObservable, useSelector } from '@legendapp/state/react';
import { useForm } from 'react-hook-form';
import { type UploadFileResponse } from 'uploadthing/client';
import { type z } from 'zod';

import useLoteria from '@/hooks/useLoteria';
import { useUploadImage } from '@/hooks/useUploadImage';
import { AspectRatio } from '@ui/AspectRatio';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@ui/Card';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';
import { Tabs, TabsList, TabsTrigger } from '@ui/Tabs';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';

const LoteriaForm = () => {
	const { props$, refForm } = useLoteria();
	const isSubmitting = useObservable(false);
	const fit = useObservable<'fit' | 'cover'>('cover');
	const fitClass = useSelector(() =>
		fit.get() === 'cover' ? undefined : 'object-fit',
	);
	const addCard = trpc.loteria.addCard.useMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		reset,
	} = useForm<z.infer<typeof FormLoteriaCardSchema>>({
		resolver: zodResolver(FormLoteriaCardSchema),
	});

	const onClientUploadComplete = async (res?: UploadFileResponse[]) => {
		res ??= [];

		if (res[0]) {
			await addCard.mutate(
				{
					img: res[0].url,
					imgKey: res[0].key,
					title: getValues('title'),
					fit: fit.get(),
				},
				{
					onSettled: () => {
						props$.refetch();
					},
				},
			);
		}
		reset();
		clearState();
		fit.set('cover');
		isSubmitting.set(false);
	};

	const { UploadImage, hasFiles, startUpload, clearState } = useUploadImage({
		onClientUploadComplete,
	});
	useEffect(() => {
		setValue('img', hasFiles);
	}, [hasFiles, setValue]);
	const submit = async () => {
		isSubmitting.set(true);
		startUpload();
	};
	return (
		<form onSubmit={handleSubmit(submit)} className='h-full'>
			<Card className='mx-auto grid h-full w-[550px] grid-cols-4' ref={refForm}>
				<div className='col-span-2 p-4'>
					<AspectRatio ratio={3 / 5}>
						<UploadImage
							className='rounded-md'
							classNameImage={fitClass}
							error={!!errors.img}
							errorMessage={
								!!errors.img ? 'Es necesario agregar una imagen' : undefined
							}
						/>
					</AspectRatio>
					<Computed>
						{() => (
							<>
								<Tabs
									value={fit.get()}
									className='mt-2 w-[400px]'
									onValueChange={(v) => {
										fit.set(v as 'fit' | 'cover');
									}}
								>
									<TabsList>
										<TabsTrigger
											disabled={isSubmitting.get()}
											className='px-3 py-1'
											value='cover'
										>
											Cover
										</TabsTrigger>
										<TabsTrigger
											disabled={isSubmitting.get()}
											className='px-3 py-1'
											value='fit'
										>
											Fit
										</TabsTrigger>
									</TabsList>
								</Tabs>
							</>
						)}
					</Computed>
				</div>
				<div className='col-span-2 flex flex-col justify-center'>
					<CardHeader>
						<CardTitle>Agregar Carta</CardTitle>
						<CardDescription>Informacio de la carta</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='bingo-description'>Descripcion</Label>
								<Computed>
									{() => (
										<Input
											id='loteria-title'
											placeholder='e.g. El agua'
											error={!!errors.title}
											errorMessage={errors.title?.message}
											disabled={isSubmitting.get()}
											{...register('title')}
										/>
									)}
								</Computed>
							</div>
						</div>
					</CardContent>
					<CardFooter className='flex justify-end'>
						<ButtonGradientLoading isLoading={isSubmitting} type='submit'>
							agregar
						</ButtonGradientLoading>
					</CardFooter>
				</div>
			</Card>
		</form>
	);
};

export default LoteriaForm;
