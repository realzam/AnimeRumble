'use client';

import { trpc } from '@/trpc/client/client';

import { type QuestionType } from '@/types/quizQuery';
import useQuiz from '@/hooks/useQuiz';
import { Button } from '@ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@ui/DropdownMenu';

const AddQuestionButton = () => {
	const { id, props } = useQuiz();
	const addQuestion = trpc.quizz.addQuestion.useMutation();

	const onClick = async (type: QuestionType['questionType']) => {
		await addQuestion.mutate(
			{ type, id },
			{
				onSettled: () => {
					props.refetch();
				},
			},
		);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='w-full'>Agregar Pregunta</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side='right'>
				<DropdownMenuLabel>Tipo de pregunta</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onClick('Multiple')}>
					Multiple
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onClick('TF')}>
					Verdadero o Falso
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AddQuestionButton;
