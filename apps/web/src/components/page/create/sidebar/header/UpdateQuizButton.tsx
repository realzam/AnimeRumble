'use client';

import { useState } from 'react';
import { CreateQuizSchema } from '@/schema/quiz';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useObservable } from '@legendapp/state/react';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import useQuiz from '@/hooks/useQuiz';
import {
	useUploadAnime,
	type TypeUploadthingResponse,
} from '@/hooks/useUploadAnime';
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
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';

const UpdateQuizButton = () => {
	const { quiz, props, id } = useQuiz();
	const updateQuiz = trpc.quizz.updateQuiz.useMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<z.infer<typeof CreateQuizSchema>>({
		resolver: zodResolver(CreateQuizSchema),
		values: {
			title: quiz.title.get(),
			description: quiz.description.get(),
		},
	});
	const isSubmitting = useObservable(false);
	const [open, setOpen] = useState(false);
	const onClientUploadComplete = (res: TypeUploadthingResponse) => {
		if (res[0]) {
			setValue('img', {
				url: res[0].url,
				key: res[0].key,
			});
		}
	};

	const { UploadFileAnime } = useUploadAnime({
		onClientUploadComplete,
		initialPreview: quiz.img.get(),
	});

	const onSubmit = async (values: z.infer<typeof CreateQuizSchema>) => {
		isSubmitting.set(true);
		await updateQuiz.mutate(
			{
				quizId: id,
				...values,
			},
			{
				onSettled: async () => {
					await props.refetch();
					isSubmitting.set(false);
					setOpen(false);
				},
			},
		);
	};

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button
					size='icon'
					variant='ghost'
					className='shrink-0'
					onClick={() => {
						setOpen(true);
					}}
				>
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle className='tracking-wide'>Modificar Quiz</DialogTitle>
						<DialogDescription>
							Realiza modificaciones del quiz aquí. Haz clic en guardar cuando
							hayas terminado
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
							<UploadFileAnime mode='auto' />
						</AspectRatio>
					</div>
					<DialogFooter>
						<ButtonGradientLoading type='submit' isLoading={isSubmitting}>
							Guardar
						</ButtonGradientLoading>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateQuizButton;
