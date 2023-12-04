import { useState } from 'react';
import { FormAddSoundtrackSchema } from '@/schema/rumble';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useObservable } from '@legendapp/state/react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@ui/Card';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';

import RumbleFieldForm from '../RumbleFieldForm';
import AnimeImageSoundtrackForm from './AnimeImageSoundtrackForm';
import AnimeTrackSoundtrackForm from './AnimeTrackSoundtrackForm';

type FormSoundtrackData = z.infer<typeof FormAddSoundtrackSchema>;
type voidF = () => void;

const SoundtrackForm = () => {
	const addSoundtrack = trpc.rumble.addSoundtrack.useMutation();
	const { refetch } = trpc.rumble.getSoundtrack.useQuery();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const startUploadImage = useObservable<voidF[]>([() => {}, () => {}]);
	const startUploadTrack = useObservable<voidF[]>([() => {}, () => {}]);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitted },
		setError,
		getValues,
		reset,
	} = useForm<FormSoundtrackData>({
		resolver: zodResolver(FormAddSoundtrackSchema),
		defaultValues: {
			hasImg: false,
		},
	});

	const resetForm = () => {
		reset();
		const clearImage = startUploadImage.get()[1];
		const clearTrack = startUploadTrack.get()[1];
		clearImage();
		clearTrack();
	};

	const submit = async (values: FormSoundtrackData) => {
		console.log('submit hasImg', values.hasImg);
		setIsSubmitting(true);
		if (values.hasImg) {
			console.log('start upload image :)');
			const startUpload = startUploadImage.get()[0];
			startUpload();
		} else {
			const startUpload = startUploadTrack.get()[0];
			startUpload();
		}
	};

	return (
		<Card className='mx-auto w-[80%] '>
			<form
				onSubmit={handleSubmit(submit, (v) => {
					console.log('error form', v, getValues());
				})}
				className='grid w-full grid-cols-5'
			>
				<div className='col-span-3 flex flex-col items-center justify-center space-y-4  p-4 font-semibold'>
					{/* Portada Soundtrack */}
					<AnimeImageSoundtrackForm
						startUploadImage={startUploadImage}
						onDropAccepted={(files) => {
							setValue('hasImg', files.length > 0);
						}}
						onRemoveFile={() => {
							setValue('hasImg', false);
						}}
						onClientUploadComplete={(img) => {
							setValue('img', img);
							const startUpload = startUploadTrack.get()[0];
							startUpload();
						}}
						disabled={isSubmitting}
					/>
					{/* Soundtrack */}
					<AnimeTrackSoundtrackForm
						disabled={isSubmitting}
						startUploadTrack={startUploadTrack}
						onDropAccepted={(files) => {
							setValue('hasSong', files.length > 0);
						}}
						error={errors.hasSong}
						onRemoveFile={() => {
							setValue('hasSong', false);
							if (isSubmitted) {
								setError('hasSong', {
									message: 'Es necesario',
								});
							}
						}}
						onClientUploadComplete={(res) => {
							const { hasSong: _, ...values } = getValues();

							addSoundtrack.mutate(
								{
									song: res[0].url,
									songKey: res[0].key,
									...values,
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
										console.log('addSoundtrack error', e);
									},
								},
							);
						}}
					/>
				</div>

				{/* formfields */}
				<div className='col-span-2 h-full'>
					<CardHeader>
						<CardTitle>Agregar a Soundtrack</CardTitle>
						<CardDescription>
							Información para el desafio de Soundtrack
							<br />
							<br />
							CANCION, ARTISTA/BANDA; ANIME, TEMPORADA, OP/ED
						</CardDescription>
					</CardHeader>

					<CardContent className='space-y-3'>
						<RumbleFieldForm
							label='Nombre de la cancion'
							register={register('songTitle')}
							error={errors.songTitle}
							errorMessage='Es necesario agregar el nombre de las cancion'
							disabled={isSubmitting}
							placeholder='White Noise'
						/>

						<RumbleFieldForm
							label='Artista/Banda'
							register={register('artist')}
							error={errors.artist}
							errorMessage='Es necesario agregar el artista o banda'
							disabled={isSubmitting}
							placeholder='HIGE DANdism;'
						/>

						<RumbleFieldForm
							label='Anime, OP/ED'
							register={register('anime')}
							error={errors.anime}
							errorMessage='Es necesario agregar el anime'
							disabled={isSubmitting}
							placeholder='Tokyo Revengers Season 2 OP'
						/>
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
		</Card>
	);
};

export default SoundtrackForm;
