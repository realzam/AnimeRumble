import { useEffect, useState } from 'react';

import useQuiz from './useQuiz';

const useValidQuestion = (questionID: string) => {
	const { quiz } = useQuiz();
	const [isValidQuizQuestion, setIsValidQuizQuestion] = useState(false);
	const [isValidQuestion, setIsValidQuestion] = useState(false);
	const [isValidAnswers, setIsValidAnswers] = useState(false);
	const [isValidCorrectAnswersQuiz, setIsValidCorrectAnswersQuiz] =
		useState(false);
	const [isValidCorrectAnswersTrueFalse, setIsValidCorrectAnswersTrueFalse] =
		useState(false);

	const question = quiz.questions.find(q => q.id === questionID);
	useEffect(() => {
		if (question) {
			const respIsValidQuestion = question.question.trim().length > 0;
			const repIsValidAnswer = question.correctAnswersQuiz.some(a => a);
			const respIsValidAnswers =
				question.answers[0].trim().length > 0 &&
				question.answers[1].trim().length > 0;
			const respIsValidCorrectAnswersTrueFalse =
				question.correctAnswerTrueFalse !== undefined;

			setIsValidQuestion(respIsValidQuestion);
			setIsValidAnswers(respIsValidAnswers);
			setIsValidCorrectAnswersQuiz(repIsValidAnswer);
			setIsValidCorrectAnswersTrueFalse(respIsValidCorrectAnswersTrueFalse);

			if (question.type === 'Quiz') {
				setIsValidQuizQuestion(
					respIsValidQuestion && respIsValidAnswers && repIsValidAnswer,
				);
			} else {
				setIsValidQuizQuestion(
					respIsValidQuestion && respIsValidCorrectAnswersTrueFalse,
				);
			}
		}
	}, [quiz, question]);

	return {
		isValidQuestion,
		isValidAnswers,
		isValidCorrectAnswersQuiz,
		isValidCorrectAnswersTrueFalse,
		isValidQuizQuestion,
	};
};

export default useValidQuestion;
