'use client';

import { Memo } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';

const QuizDescription = () => {
	const { quiz } = useQuiz();
	return <Memo>{quiz.description}</Memo>;
};

export default QuizDescription;
