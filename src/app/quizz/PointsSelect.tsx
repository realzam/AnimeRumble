import { useContext } from 'react';
import { QuizContext } from '@/context/quiz';
import { type UpdateQuizSchema } from '@/schema/quiz';
import { trpc } from '@/trpc/client/client';
import { type z } from 'zod';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

type PointsEnum = Required<
	Pick<z.infer<typeof UpdateQuizSchema>, 'points'>
>['points'];

export function PointsSelect() {
	const { quiz, questionUI, refetch } = useContext(QuizContext);
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();
	return (
		<div className='m-2 flex flex-col items-center p-1'>
			<h3 className='mb-2 font-semibold leading-none tracking-tight'>Puntos</h3>
			<Select
				value={questionUI.points}
				onValueChange={(value: PointsEnum) => {
					updateQuestion.mutate(
						{
							questionId: questionUI.id,
							quizId: quiz.id,
							points: value,
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
						<SelectItem value='standar'>Normales</SelectItem>
						<SelectItem value='none'>Sin puntos</SelectItem>
						<SelectItem value='double'>Puntos Doble</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
