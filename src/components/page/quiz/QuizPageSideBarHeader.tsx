'use client';

import { trpc } from '@/trpc/client/client';
import { Memo, useObservable } from '@legendapp/state/react';

import { sleep } from '@/lib/utils';
import useQuiz from '@/hooks/useQuiz';
import { CardDescription, CardHeader, CardTitle } from '@ui/Card';
import ButtonGradientLoading from '@web/ButtonGradientLoading';

import UpdateQuizDialog from './UpdateQuizDialog';

const QuizPageSideBarHeader = () => {
	const { quiz, props$, id, setQuestionUi, ui } = useQuiz();
	const addQuestion = trpc.quizz.addQuestion.useMutation();
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
					await addQuestion.mutate(
						{ id },
						{
							onSettled: async (q) => {
								if (q) {
									ui.scroll.set(true);
									ui.scrollToQuestion.set(q.id);
									await props$.refetch();
									await sleep(200);
									setQuestionUi(q.id);
								}
								disableButton.set(false);
							},
						},
					);
				}}
			>
				Agregar pregunta
			</ButtonGradientLoading>
		</CardHeader>
	);
};

export default QuizPageSideBarHeader;
