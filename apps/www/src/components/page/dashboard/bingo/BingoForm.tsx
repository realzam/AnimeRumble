import { AddBingoReactiveSchema } from '@/schema/bingo';
import { trpc } from '@/trpc/client/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import useBingo from '@/hooks/useBingo';
import { Button } from '@ui/Button';
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

const BingoForm = () => {
	const { props$ } = useBingo();
	const addReactive = trpc.bingo.addReactive.useMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		// setValue,
		// getValues,
		// reset,
	} = useForm<z.infer<typeof AddBingoReactiveSchema>>({
		resolver: zodResolver(AddBingoReactiveSchema),
	});

	const submit = async (values: z.infer<typeof AddBingoReactiveSchema>) => {
		console.log(values);

		addReactive.mutate(values, {
			onSettled: () => {
				props$.refetch();
			},
		});
	};

	return (
		<Card>
			<form onSubmit={handleSubmit(submit)} className='h-full'>
				<CardHeader>
					<CardTitle>Crear pregunta</CardTitle>
					<CardDescription>Reactvos para la actividad de bingo</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='bingo-description'>Descripcion</Label>
							<Input
								id='bingo-description'
								placeholder='e.g. Historientas de origen japonés ...'
								error={!!errors.description}
								errorMessage={errors.description?.message}
								{...register('description')}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='bingo-response'>Respuesta</Label>
							<Input
								id='bingo-response'
								placeholder='...Manga'
								error={!!errors.response}
								errorMessage={errors.response?.message}
								{...register('response')}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex justify-end'>
					<Button variant='gradient' type='submit'>
						agregar
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};

export default BingoForm;
