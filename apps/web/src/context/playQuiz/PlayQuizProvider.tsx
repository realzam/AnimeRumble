'use client';

import { trpc } from '@/trpc/client/client';
import { useMount, useObservable } from '@legendapp/state/react';

import {
	type TypeGetQuestionUser,
	type TypeGetQuizPlay,
	type TypeGetSimpleSumaryUser,
} from '@/types/quizQuery';
import { sleep } from '@/lib/utils';

import { PlayQuizContext, type StatesPlayQuiz } from './PlayQuizContext';

interface Props {
	children: React.ReactNode;
	quiz: TypeGetQuizPlay;
}

const PlayQuizProvider = ({ children, quiz }: Props) => {
	const utils = trpc.useUtils();
	const joinQuiz = trpc.quizz.joinQuiz.useMutation();
	const getQuestionUser = trpc.quizz.getQuestionUser.useMutation();
	const answerQuiz = trpc.quizz.answerQuiz.useMutation();

	const correctAns = useObservable<number[]>([]);
	const time = useObservable(100);
	const finishTime = useObservable(0);
	const showCorrectAnswer = useObservable(false);
	const isCorrectAnswer = useObservable(false);
	const isLoadingAnswer = useObservable(false);
	const cancelTimer = useObservable(false);
	const points = useObservable(0);
	const simpleSumary = useObservable<TypeGetSimpleSumaryUser>(
		{} as TypeGetSimpleSumaryUser,
	);
	const stateQuiz = useObservable<StatesPlayQuiz>(
		quiz.sessions[0] ? 'showLoading' : 'showStart',
	);
	const questionUser = useObservable<TypeGetQuestionUser>(
		{} as TypeGetQuestionUser,
	);
	const sessionQuiz = useObservable<string | undefined>(
		quiz.sessions[0]?.id || undefined,
	);

	const getSumary = () => {
		const session = quiz.sessions[0]!;
		utils.client.quizz.getSimpleSumary
			.query({ sessionId: session.id })
			.then((res: TypeGetSimpleSumaryUser) => {
				simpleSumary.set(res), stateQuiz.set('showEnd');
			});
	};

	useMount(() => {
		const session = quiz.sessions[0];
		if (session) {
			if (session.index === quiz.questions.length) {
				getSumary();
			} else {
				loadNextQuestion();
			}
		}
	});

	const showQuestion = async () => {
		stateQuiz.set('showQuestion');
		await sleep(1000 * 5);
		stateQuiz.set('showFullUI');
	};

	const joinToQuiz = () => {
		joinQuiz.mutate(
			{ quizId: quiz.id },
			{
				onSuccess: (id) => {
					sessionQuiz.set(id);
					loadNextQuestion();
				},
			},
		);
	};

	const loadNextQuestion = () => {
		const sessionId = sessionQuiz.get();
		if (sessionId) {
			showCorrectAnswer.set(false);
			isLoadingAnswer.set(false);
			cancelTimer.set(false);
			stateQuiz.set('showLoading');
			if (quiz.questions.length - 1 === questionUser.position.get()) {
				getSumary();
				return;
			}
			getQuestionUser.mutate(
				{
					sessionId,
				},
				{
					onSuccess: (question) => {
						questionUser.set(question);
						showQuestion();
					},
				},
			);
		}
	};

	const answer = async (index: number) => {
		const qTime = parseInt(questionUser.time.get()) * 1000;
		const time = qTime - (finishTime.get() - Date.now());
		cancelTimer.set(true);
		isLoadingAnswer.set(true);
		answerQuiz.mutate(
			{
				answer: index,
				sessionId: sessionQuiz.get()!,
				time,
			},
			{
				onSuccess: ({ isCorrect, points: pointsValue, correct }) => {
					isCorrectAnswer.set(isCorrect);
					points.set(pointsValue);
					correctAns.set(correct);
					showCorrectAnswer.set(true);
					isLoadingAnswer.set(false);
				},
				onError: () => {
					isLoadingAnswer.set(false);
				},
			},
		);
		await sleep(3000);
		await loadNextQuestion();
	};

	return (
		<PlayQuizContext.Provider
			value={{
				simpleSumary,
				stateQuiz,
				quiz,
				questionUser,
				joinToQuiz,
				time,
				showCorrectAnswer,
				isCorrectAnswer,
				answer,
				cancelTimer,
				points,
				finishTime,
				correctAns,
				isLoadingAnswer,
			}}
		>
			{children}
		</PlayQuizContext.Provider>
	);
};

export default PlayQuizProvider;
