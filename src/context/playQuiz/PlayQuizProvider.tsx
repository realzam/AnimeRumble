'use client';

import { useObservable, useSelector } from '@legendapp/state/react';

import { type QuizDataType } from '@/types/quizQuery';
import { sleep } from '@/lib/utils';

import { PlayQuizContext, type StatesPlayQuiz } from './PlayQuizContext';

interface Props {
	initialQuiz: QuizDataType;
	children: React.ReactNode;
}

const PlayQuizProvider = ({ children, initialQuiz }: Props) => {
	const stateQuiz = useObservable<StatesPlayQuiz>('showStart');
	const index = useObservable(0);
	const questions = useObservable(initialQuiz.questions);
	const question = useSelector(() => questions.get()[index.get()]);
	const showCorrectAnswer = useObservable(false);
	const isCorrectAnswer = useObservable(false);

	const startQuiz = async () => {
		await sleep(6000);
		stateQuiz.set('showQuestion');
		await sleep(3000);
		stateQuiz.set('showFullUI');
	};

	const answer = async (index: number) => {
		if (question.questionType == 'TF') {
			isCorrectAnswer.set(index === 1 && question.correctAnswerTF);
		} else {
			isCorrectAnswer.set(question.correctAnswers[index]);
		}
		showCorrectAnswer.set(true);
		await sleep(3000);
		await nextQuestion();
	};

	const nextQuestion = async () => {
		if (questions.length - 1 === index.get()) {
			stateQuiz.set('showEnd');
			return;
		}
		stateQuiz.set('showPrelude');
		await sleep(500);
		showCorrectAnswer.set(false);
		isCorrectAnswer.set(false);
		index.set((v) => v + 1);
		await sleep(500);
		stateQuiz.set('showQuestion');
		await sleep(3000);
		stateQuiz.set('showFullUI');
	};

	return (
		<PlayQuizContext.Provider
			value={{
				stateQuiz,
				questions,
				index,
				nextQuestion,
				question,
				startQuiz,
				showCorrectAnswer,
				isCorrectAnswer,
				answer,
			}}
		>
			{children}
		</PlayQuizContext.Provider>
	);
};

export default PlayQuizProvider;
