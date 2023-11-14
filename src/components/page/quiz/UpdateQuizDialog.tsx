'use client';

import { CreateQuizSchema } from '@/schema/quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import { Show, useObservable } from '@legendapp/state/react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { type UploadFileResponse } from 'uploadthing/client';
import { type z } from 'zod';

// import useQuiz from '@/hooks/useQuiz';
import { useUploadV2 } from '@/hooks/useUploadImage';
import { Button } from '@ui/Button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/Dialog';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';

type Props = z.infer<typeof CreateQuizSchema>;
const UpdateQuizDialog = ({ title, description }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof CreateQuizSchema>>({
		resolver: zodResolver(CreateQuizSchema),
		defaultValues: {
			title,
			description,
		},
	});

	const isSubmitting = useObservable(false);

	const onClientUploadComplete = (res?: UploadFileResponse[]) => {
		res ??= [];
		isSubmitting.set(false);
		// let img:
		// 	| {
		// 			url: string;
		// 			key: string;
		// 	  }
		// 	| undefined = undefined;
		// if (res[0]) {
		// 	img = {
		// 		url: res[0].url,
		// 		key: res[0].key,
		// 	};
		// }
	};

	const { UploadImage, startUpload } = useUploadV2({
		onClientUploadComplete,
	});

	const onSubmit = () => {
		isSubmitting.set(true);
		startUpload();
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size='icon'
					variant='ghost'
					onClick={() => {
						// router.push('/admin/quiz/' + [quiz.id]);
					}}
				>
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Información del quiz</DialogTitle>
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

export default UpdateQuizDialog;
