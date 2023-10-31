'use client';

import { useContext } from 'react';
import { QuizContext } from '@/context/quiz';
import { trpc } from '@/trpc/client/client';

import { CardDescription, CardHeader, CardTitle } from '@ui/Card';
import ButtonGradientLoading from '@/components/ui-web/ButtonGradientLoading';

const QuizPageSideBarHeader = () => {
	const { refetch, quiz } = useContext(QuizContext);
	const addQuestion = trpc.quizz.addQuestion.useQuery(
		{ id: quiz.id },
		{ enabled: false },
	);
	return (
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
	);
};

export default QuizPageSideBarHeader;
