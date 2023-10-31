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

type TimeEnum = Required<
	Pick<z.infer<typeof UpdateQuizSchema>, 'time'>
>['time'];

export default function TimeSelect() {
	const { quiz, questionUI, refetch } = useContext(QuizContext);
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();
	console.log(questionUI);

	return (
		<div className='m-2 flex flex-col items-center p-1'>
			<h3 className='mb-2 font-semibold leading-none tracking-tight'>
				Limite Tiempo
			</h3>
			<Select
				value={questionUI.time}
				onValueChange={(value: TimeEnum) => {
					updateQuestion.mutate(
						{
							questionId: questionUI.id,
							quizId: quiz.id,
							time: value,
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
						<SelectItem value='5'>5 segundos</SelectItem>
						<SelectItem value='10'>10 segundos</SelectItem>
						<SelectItem value='15'>15 segundos</SelectItem>
						<SelectItem value='20'>20 segundos</SelectItem>
						<SelectItem value='30'>30 segundos</SelectItem>
						<SelectItem value='45'>45 segundos</SelectItem>
						<SelectItem value='60'>60 segundos</SelectItem>
						<SelectItem value='90'>90 segundos</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
