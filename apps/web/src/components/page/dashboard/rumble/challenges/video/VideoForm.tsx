import { useEffect, useState } from 'react';
import { FormGallerySchema } from '@/schema/rumble';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Computed,
	Show,
	useMount,
	useObservable,
} from '@legendapp/state/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { sleep } from '@/lib/utils';
import { useUploadAnime } from '@/hooks/useUploadAnime';
import { AspectRatio } from '@ui/AspectRatio';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@ui/Card';
import { Label } from '@ui/Label';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Switch } from '@/components/ui/Switch';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';

import RumbleFieldForm from '../RumbleFieldForm';

const VideoFormContainer = () => {
	return (
		<Card className='mx-auto w-[80%]'>
			<VideoForm />
		</Card>
	);
};

type FormGalleryData = z.infer<typeof FormGallerySchema>;

const VideoForm = () => {
	const {
		register,
		formState: { errors, isSubmitted },
		handleSubmit,
		getValues,
		setValue,
		clearErrors,

		reset,
	} = useForm<FormGalleryData>({
		resolver: zodResolver(FormGallerySchema),
		defaultValues: {
			isMultiple: false,
			checked: 0,
		},
	});
	const isMultiple = useObservable(false);
	const { refetch } = trpc.rumble.getGallery.useQuery();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const addGallery = trpc.rumble.addGallery.useMutation();

	const resetForm = () => {
		reset({
			checked: 0,
			hasImg: false,
			isMultiple: false,
			question: '',
		});
		clearState();
		isMultiple.set(false);
	};
	const { UploadFileAnime, hasFiles, startUpload, clearState } = useUploadAnime(
		{
			endpoint: 'videoUploader',
			onClientUploadComplete: async (res) => {
				const {
					question,
					checked,
					hasImg: _,
					isMultiple,
					...opt
				} = getValues();
				let options = [opt.option1];
				if (isMultiple) {
					options = Object.values(opt);
				}
				await sleep(1000);
				await addGallery.mutate(
					{
						img: res[0].url,
						imgKey: res[0].key,
						question,
						answer: checked,
						options,
					},
					{
						onSuccess: () => {
							resetForm();
							refetch();
						},
						onSettled: () => {
							setIsSubmitting(false);
						},
						onError: (e) => {
							console.log('addGallery error', e);
						},
					},
				);
			},
		},
	);

	const submit = async (values: FormGalleryData) => {
		setIsSubmitting(true);
		console.log('submit', values);
		await startUpload();
	};

	useMount(() => {
		isMultiple.set(getValues('isMultiple'));
	});

	useEffect(() => {
		setValue('hasImg', hasFiles);
	}, [hasFiles, setValue]);

	return (
		<form onSubmit={handleSubmit(submit)} className='grid w-full grid-cols-5'>
			{/* image dropzone */}
			<div className='col-span-3 p-4'>
				<AspectRatio ratio={16 / 9}>
					<UploadFileAnime
						className='rounded-md'
						error={!!errors.hasImg}
						errorMessage={
							!!errors.hasImg ? 'Es necesario agregar una imagen' : undefined
						}
					/>
				</AspectRatio>
			</div>

			{/* form fields */}
			<div className='col-span-2 h-full'>
				<CardHeader>
					<CardTitle>Agregar Video</CardTitle>
					<CardDescription>
						Información para el desafio de Video
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-3'>
					<RumbleFieldForm
						label='Pregunta'
						register={register('question')}
						error={errors.question}
						errorMessage='Es necesario agregar una pregunta'
						disabled={isSubmitting}
					/>
					<div className='flex items-center space-x-2'>
						<Computed>
							{() => (
								<Switch
									disabled={isSubmitting}
									checked={isMultiple.get()}
									onClick={() => {
										isMultiple.toggle();
									}}
									onCheckedChange={(value) => {
										setValue('checked', value ? 4 : 0);
										setValue('isMultiple', value);
									}}
								/>
							)}
						</Computed>
						<Label htmlFor='airplane-mode'>Opción multiple</Label>
					</div>
					<Show
						if={isMultiple}
						else={
							<RumbleFieldForm
								label='Pregunta'
								register={register('option1')}
								error={errors.option1}
								errorMessage='Es necesario agregar una pregunta'
								disabled={isSubmitting}
							/>
						}
					>
						<RadioGroup
							disabled={isSubmitting}
							className='space-y-3'
							onValueChange={(v) => {
								setValue('checked', parseInt(v));
								if (isSubmitted) {
									clearErrors('checked');
								}
							}}
						>
							<RumbleFieldForm
								label='Opción 1'
								register={register('option1')}
								error={errors.option1}
								errorMessage='Es necesario agregar la opción'
								hasRadioItem
								radioValue='0'
								errorRadioItem={!!errors.checked}
								disabled={isSubmitting}
							/>
							<RumbleFieldForm
								label='Opción 2'
								register={register('option2')}
								error={errors.option2}
								errorMessage='Es necesario agregar la opción'
								hasRadioItem
								radioValue='1'
								errorRadioItem={!!errors.checked}
								disabled={isSubmitting}
							/>
							<RumbleFieldForm
								label='Opción 3'
								register={register('option3')}
								error={errors.option3}
								errorMessage='Es necesario agregar la opción'
								hasRadioItem
								radioValue='2'
								errorRadioItem={!!errors.checked}
								disabled={isSubmitting}
							/>
							<RumbleFieldForm
								label='Opción 4'
								register={register('option4')}
								error={errors.option4}
								errorMessage='Es necesario agregar la opción'
								hasRadioItem
								radioValue='3'
								errorRadioItem={!!errors.checked}
								disabled={isSubmitting}
							/>
						</RadioGroup>
					</Show>
				</CardContent>

				<CardFooter className='flex justify-end'>
					<ButtonGradientLoading
						isLoading={isSubmitting}
						type='submit'
						onClick={() => {
							console.log('button click');
						}}
					>
						Agregar
					</ButtonGradientLoading>
				</CardFooter>
			</div>
		</form>
	);
};

export default VideoFormContainer;
