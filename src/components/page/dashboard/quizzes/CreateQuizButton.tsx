'use client';

import { useRouter } from 'next/navigation';
import { CreateQuizSchema } from '@/schema/quiz';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Show, useObservable } from '@legendapp/state/react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import animeRumbleRoutes from '@/lib/routes';
import {
	useUploadImage,
	type TypeUploadthingResponse,
} from '@/hooks/useUploadImage';
import { AspectRatio } from '@ui/AspectRatio';
import { Button } from '@ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/Dialog';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';

const CreateQuizButton = () => {
	const createQuiz = trpc.quizz.createQuizz.useMutation();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<z.infer<typeof CreateQuizSchema>>({
		resolver: zodResolver(CreateQuizSchema),
	});
	const isSubmitting = useObservable(false);

	const onClientUploadComplete = (res: TypeUploadthingResponse) => {
		isSubmitting.set(false);
		let img:
			| {
					url: string;
					key: string;
			  }
			| undefined = undefined;
		if (res[0]) {
			img = {
				url: res[0].url,
				key: res[0].key,
			};
		}
		createQuiz.mutate(
			{
				...getValues(),
				img,
			},
			{
				onSuccess: (v) => {
					router.push(animeRumbleRoutes.createQuiz + v.quiz.id);
				},
			},
		);
	};

	const { UploadImage, startUpload, hasFiles } = useUploadImage({
		onClientUploadComplete,
	});

	const onSubmit = (values: z.infer<typeof CreateQuizSchema>) => {
		isSubmitting.set(true);
		if (hasFiles) {
			startUpload();
			return;
		}

		const { img: _, ...v } = values;
		createQuiz.mutate(
			{
				...v,
			},
			{
				onSuccess: (v) => {
					router.push(animeRumbleRoutes.createQuiz + v.quiz.id);
				},
			},
		);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='gradient'>Crear quiz</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Crear quiz</DialogTitle>
						<DialogDescription>
							aaae Make changes to your profile here. Click save when youre
							done.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 gap-4'>
							<Label htmlFor='title' className='mt-3 text-right'>
								Título
							</Label>
							<div className='col-span-3 flex flex-col justify-end'>
								<Input
									id='title'
									error={!!errors.title}
									errorMessage={errors.title?.message}
									{...register('title')}
								/>
							</div>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='description' className='text-right'>
								Descripción
							</Label>
							<Input
								className='col-span-3'
								id='description'
								error={!!errors.description}
								errorMessage={errors.description?.message}
								{...register('description')}
							/>
						</div>
						<AspectRatio ratio={16 / 9}>
							<UploadImage />
						</AspectRatio>
					</div>
					<DialogFooter>
						<Button
							variant='gradient'
							type='submit'
							disabled={isSubmitting.get()}
						>
							<Show if={isSubmitting} else={<>Crear</>}>
								<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
								Espere porfavor
							</Show>
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateQuizButton;
