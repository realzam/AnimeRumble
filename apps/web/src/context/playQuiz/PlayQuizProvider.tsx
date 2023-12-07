'use client';

import { trpc } from '@/trpc/client/client';
import {
	useObservable,
	useObserve,
	useSelector,
	useUnmount,
} from '@legendapp/state/react';

import { type AnserUserDataType, type QuizDataType } from '@/types/quizQuery';
import { sleep } from '@/lib/utils';

import { PlayQuizContext, type StatesPlayQuiz } from './PlayQuizContext';

interface Props {
	initialQuiz: QuizDataType;
	user: string;
	children: React.ReactNode;
}

const PlayQuizProvider = ({ children, initialQuiz, user }: Props) => {
	const answerQuiz = trpc.quizz.answerQuiz.useMutation();
	const answersUserQuery = trpc.quizz.getAnswerUser.useQuery(
		{
			user,
			quizId: initialQuiz.id,
		},
		{
			enabled: false,
		},
	);

	const stateQuiz = useObservable<StatesPlayQuiz>('showStart');
	const index = useObservable(0);
	const questions = initialQuiz.questions;
	const question = useSelector(() => questions[index.get()]);
	const showCorrectAnswer = useObservable(false);
	const isCorrectAnswer = useObservable(false);
	const answersUser = useObservable<AnserUserDataType>([]);
	const time = useObservable(1);
	const corriendo = useObservable(false);
	const interval = useObservable<NodeJS.Timeout | undefined>(undefined);
	const points = useObservable(0);
	const timeInt = useSelector(() => {
		console.log('useSelector.timeInt', questions, index.get());

		return 20 * 100;
	});

	const startTimer = () => {
		const t = parseInt(questions[index.get()].time);
		time.set(t * 100);
		corriendo.set(true);
	};

	const stopTimer = () => {
		corriendo.set(false);
	};

	useObserve(corriendo, () => {
		if (corriendo.get()) {
			const i = setInterval(() => {
				time.set((prev) => prev - 1);
			}, 10);
			interval.set(i);
		} else {
			clearInterval(interval.get());
		}
	});

	useUnmount(() => {
		clearInterval(interval.get());
		corriendo.set(false);
	});

	const startQuiz = async () => {
		await sleep(6000);
		stateQuiz.set('showQuestion');
		await sleep(3000);
		stateQuiz.set('showFullUI');
		startTimer();
	};

	const answer = async (index: number) => {
		stopTimer();
		let elapseTime = timeInt - time.get();
		const m = -900 * (elapseTime / timeInt);
		let pointsCalulated = Math.ceil(m + 1000);
		pointsCalulated = Math.max(100, pointsCalulated);
		points.set(Math.ceil(pointsCalulated));

		if (index == -1) {
			isCorrectAnswer.set(false);
			elapseTime = timeInt;
			points.set(0);
		} else {
			if (question.questionType == 'TF') {
				isCorrectAnswer.set(
					(index === 1 && !!question.correctAnswerTF) ||
						(index === 0 && !question.correctAnswerTF),
				);
			} else {
				isCorrectAnswer.set(question.correctAnswers[index]);
			}
			await sleep(3);
		}
		showCorrectAnswer.set(true);

		await answerQuiz.mutate({
			answer: index,
			questionId: question.id,
			quizId: initialQuiz.id,
			time: elapseTime,
		});
		await sleep(3000);
		await nextQuestion();
	};

	const nextQuestion = async () => {
		stopTimer();
		if (questions.length - 1 === index.get()) {
			stateQuiz.set('showEnd');
			const { data } = await answersUserQuery.refetch();
			answersUser.set(data!);
			return;
		}
		stateQuiz.set('showPrelude');
		await sleep(300);
		showCorrectAnswer.set(false);
		isCorrectAnswer.set(false);
		index.set((v) => v + 1);
		await sleep(100);
		time.set(timeInt);
		await sleep(500);
		stateQuiz.set('showQuestion');
		await sleep(3000);
		stateQuiz.set('showFullUI');
		startTimer();
	};

	useObserve(time, () => {
		if (time.get() <= -70 && corriendo.get()) {
			clearInterval(interval.get());
			stopTimer();
			answer(-1);
		}
	});

	return (
		<PlayQuizContext.Provider
			value={{
				stateQuiz,
				index,
				questions,
				question,
				isCorrectAnswer,
				showCorrectAnswer,
				points,
				time,
				answer,
				startQuiz,
				nextQuestion,
				timeInt,
				answersUser,
			}}
		>
			{children}
		</PlayQuizContext.Provider>
	);
};

export default PlayQuizProvider;
