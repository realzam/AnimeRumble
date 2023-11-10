'use client';

import QuizProvider from '@/context/quiz/QuizProvider';

import { type QuizDataType } from '@/types/quizQuery';

import QuizContainer from './QuizContainer';

interface Props {
	initialQuiz: QuizDataType;
}
const QuizPage = ({ initialQuiz }: Props) => {
	return (
		<QuizProvider initialQuiz={initialQuiz}>
			<QuizContainer />
		</QuizProvider>
	);
};

export default QuizPage;
