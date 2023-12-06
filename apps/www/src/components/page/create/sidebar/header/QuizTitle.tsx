'use client';

import { Memo } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';

const QuizTitle = () => {
	const { quiz } = useQuiz();
	return <Memo>{quiz.title}</Memo>;
};

export default QuizTitle;
