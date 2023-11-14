'use client';

import { useSearchParams } from 'next/navigation';
import QuizProvider from '@/context/quiz/QuizProvider';

import { type QuizDataType } from '@/types/quizQuery';

import QuizContainer from './QuizContainer';

interface Props {
	initialQuiz: QuizDataType;
}
const QuizPage = ({ initialQuiz }: Props) => {
	const searchParams = useSearchParams();
	const index = searchParams.get('index');
	let indexNum = 0;
	if (index) {
		try {
			const n = parseInt(index);
			if (n >= 0 && n < initialQuiz.questions.length) {
				indexNum = n;
			}
		} catch (error) {}
	}
	return (
		<QuizProvider initialQuiz={initialQuiz} index={indexNum}>
			<QuizContainer />
		</QuizProvider>
	);
};

export default QuizPage;
