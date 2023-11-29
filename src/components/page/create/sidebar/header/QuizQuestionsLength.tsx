'use client';

import { Memo } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';

const QuizQuestionsLength = () => {
	const { quiz } = useQuiz();

	return (
		<Memo>
			{() => (
				<>{`${quiz.questions.get().length} ${
					quiz.questions.get().length > 1 ? 'preguntas' : 'pregunta'
				}`}</>
			)}
		</Memo>
	);
};

export default QuizQuestionsLength;
