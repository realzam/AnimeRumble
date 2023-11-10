'use client';

import { For, Memo, useComputed } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import { ScrollArea } from '@ui/ScrollArea';

import QuestionItemList from './QuestionItemList';

const ListQuizzes = () => {
	const { quiz } = useQuiz();
	const numberQuestions = useComputed(() => quiz.questions.length);
	const numberQuestionsText = useComputed(
		() =>
			`${numberQuestions.get()} ${
				numberQuestions.get() === 1 ? 'pregunta' : 'preguntas'
			}`,
	);

	return (
		<ScrollArea type='always'>
			<div className='px-5 py-4'>
				<div className='text-violet-400'>
					<Memo>{numberQuestionsText}</Memo>
				</div>
				<For each={quiz.questions} item={QuestionItemList} />
			</div>
		</ScrollArea>
	);
};

export default ListQuizzes;
