'use client';

import { Memo, useComputed } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import { Card } from '@ui/Card';

import ListQuizzes from './ListQuizzes';
import QuizPageSideBarHeader from './QuizPageSideBarHeader';

const QuizPageSideBar = () => {
	const { quiz } = useQuiz();

	const numberQuestions = useComputed(() => quiz.questions.length);
	const numberQuestionsText = useComputed(
		() =>
			`${numberQuestions.get()} ${
				numberQuestions.get() === 1 ? 'pregunta' : 'preguntas'
			}`,
	);
	return (
		<Card className='mr-4 flex h-full w-80 shrink-0 flex-col'>
			<QuizPageSideBarHeader />
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center  uppercase'>
					<span className='bg-background px-2 text-violet-400'>
						<Memo>{numberQuestionsText}</Memo>
					</span>
				</div>
			</div>

			<ListQuizzes />
		</Card>
	);
};

export default QuizPageSideBar;
