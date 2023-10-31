'use client';

import { useContext } from 'react';
import { QuizContext } from '@/context/quiz';
import { trpc } from '@/trpc/client/client';
import { Show, useComputed } from '@legendapp/state/react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

import { AnswerCard, AnswerTFCard } from './AnswerCard';

const AnswersTypeContainer = () => {
	const { quiz, questionUI, refetch, typeQuestion } = useContext(QuizContext);
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();
	const multiple = useComputed(() => typeQuestion.get() === 'Multiple');
	const tf = useComputed(() => typeQuestion.get() === 'TF');

	return (
		<div className='flex flex-col p-1'>
			<div className='mb-2'>
				<Select
					value={questionUI.questionType}
					onValueChange={(value: 'Multiple' | 'TF') => {
						typeQuestion.set(value);

						updateQuestion.mutate(
							{
								questionId: questionUI.id,
								quizId: quiz.id,
								questionType: value,
							},
							{
								onSettled: () => {
									refetch();
								},
							},
						);
					}}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Tipo de respuesta</SelectLabel>
							<SelectItem value='Multiple'>Multiple</SelectItem>
							<SelectItem value='TF'>Verdadero o Falso</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className='mt-2 grid grid-cols-2 gap-4'>
				<Show if={multiple}>
					<AnswerCard index={0} />
					<AnswerCard color='blue' index={1} />
					<AnswerCard color='yellow' index={2} />
					<AnswerCard color='green' index={3} />
				</Show>
				<Show if={tf}>
					<AnswerTFCard />
					<AnswerTFCard variantTrue={false} />
				</Show>
			</div>
		</div>
	);
};

export default AnswersTypeContainer;
