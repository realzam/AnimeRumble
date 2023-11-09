import React, { useContext } from 'react';
import { BearContext } from '@/context/bear/bearContext';
import { trpc } from '@/trpc/client/client';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';

import { Button } from '@/components/ui/Button';

const AddQuizButton = () => {
	const { initialQuiz } = useContext(BearContext);
	const addQuestion = trpc.quizz.addQuestion.useMutation();

	const getQuestion = trpc.quizz.getQuizz;
	const query$ = useObservableQuery({
		queryKey: ['key'],
		queryFn: () =>
			getQuestion.useQuery(
				{
					id: initialQuiz.id,
				},
				{
					initialData: initialQuiz,
				},
			),
	});
	const { refetch } = query$.get();
	return (
		<Button
			onClick={async () => {
				await addQuestion.mutate(
					{
						id: initialQuiz.id,
					},
					{
						onSettled: () => {
							refetch();
						},
					},
				);
			}}
		>
			add questions
			{initialQuiz.title}
		</Button>
	);
};

export default AddQuizButton;
