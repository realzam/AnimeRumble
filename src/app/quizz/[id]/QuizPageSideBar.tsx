'use client';

import { useContext } from 'react';
import { trpc } from '@/trpc/client/client';
import { QuizContext } from '@context/quiz';

import { Card, CardDescription, CardHeader, CardTitle } from '@ui/Card';
import { Separator } from '@ui/Separator';
import ButtonGradientLoading from '@web/ButtonGradientLoading';

import ListQuizzes from '../ListQuizzes';

const QuizPageSideBar = () => {
	const { refetch, quiz } = useContext(QuizContext);

	const addQuestion = trpc.quizz.addQuestion.useQuery(
		{ id: quiz.id },
		{
			enabled: false,
		},
	);

	return (
		<Card className='mr-4 flex h-full w-80 shrink-0 flex-col'>
			<CardHeader>
				<CardTitle>Hola mundo</CardTitle>
				<CardDescription>desc</CardDescription>
				<ButtonGradientLoading
					isLoading={false}
					onClick={async () => {
						await addQuestion.refetch();
						await refetch();
					}}
				>
					Agregar pregunta
				</ButtonGradientLoading>
			</CardHeader>
			<Separator />
			<ListQuizzes />
		</Card>
	);
};

export default QuizPageSideBar;
