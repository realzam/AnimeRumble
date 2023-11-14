'use client';

import { Memo, useObservable } from '@legendapp/state/react';

import { sleep } from '@/lib/utils';
import useQuiz from '@/hooks/useQuiz';
import { CardDescription, CardHeader, CardTitle } from '@ui/Card';
import ButtonGradientLoading from '@web/ButtonGradientLoading';

import UpdateQuizDialog from './UpdateQuizDialog';

const QuizPageSideBarHeader = () => {
	const { quiz, trpcUtils, props$, id } = useQuiz();
	const disableButton = useObservable(false);
	return (
		<CardHeader>
			<CardTitle className='flex items-center justify-between '>
				<span className='truncate'>
					<Memo>{quiz.title}</Memo>
				</span>
				<UpdateQuizDialog
					title={quiz.title.get()}
					description={quiz.description.get()}
				/>
			</CardTitle>
			<CardDescription>
				<Memo>{quiz.description}</Memo>
			</CardDescription>
			<ButtonGradientLoading
				isLoading={disableButton}
				onClick={async () => {
					disableButton.set(true);
					await sleep(200);
					trpcUtils.client.quizz.addQuestion
						.mutate({
							id,
						})
						.then(() => props$.get().refetch())
						.then(() => disableButton.set(false));
				}}
			>
				Agregar pregunta
			</ButtonGradientLoading>
		</CardHeader>
	);
};

export default QuizPageSideBarHeader;
