import React from 'react';
import { trpc } from '@/trpc/client/client';
import { useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { type UseBaseQueryResult } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import { type QuizDataType } from '@/types/quizQuery';

import { QuizContex, type UiType } from './QuizContex';

interface Props {
	initialQuiz: QuizDataType;
	children: React.ReactNode;
	index: number;
}

type QQ = UseBaseQueryResult<QuizDataType, unknown>;

const QuizProvider = ({ children, initialQuiz, index }: Props) => {
	const utils = trpc.useUtils();
	let n = 0;
	if (index >= 0 && index < initialQuiz.questions.length) {
		n = index;
	}

	const ui = useObservable<UiType>({
		questionId: initialQuiz.questions[n].id,
		question: initialQuiz.questions[n],
		isDragging: false,
		scroll: n > 0,
		scrollToQuestion: initialQuiz.questions[n].id,
	});

	const quiz = useObservable(initialQuiz);
	const query$ = useObservableQuery({
		queryKey: getQueryKey(trpc.quizz.getQuizz, { id: initialQuiz.id }, 'query'),
		queryFn: () =>
			utils.client.quizz.getQuizz
				.query({ id: initialQuiz.id })
				.then((res: QuizDataType) => res),
		initialData: initialQuiz,
	});
	const props$ = useObservable<Omit<QQ, 'data'>>(() => {
		const q = query$.get();
		const { data: _, ...opt } = q;
		return opt;
	});

	const setQuestionUi = (id: string) => {
		const question = quiz.questions.get().find((q) => q.id === id);
		if (question) {
			ui.set((v) => ({
				...v,
				question,
				questionId: question.id,
				isDragging: false,
			}));
		}
	};
	const setQuestionUiAfterDelete = () => {
		const index = quiz.questions
			.get()
			.findIndex((q) => q.id === ui.question.id.get());
		let question = quiz.questions[0].get();
		if (index > 0) {
			question = quiz.questions[index - 1].get();
		}
		ui.set((v) => ({
			...v,
			question,
			questionId: question.id,
			isDragging: false,
		}));
	};

	useObserve(() => {
		const q = query$.get();
		const { data, ...opt } = q;
		if (data) {
			quiz.set(data);
		}
		props$.set(opt);
	});

	useObserve(() => {
		const e = quiz.questions.get().find((q) => q.id === ui.questionId.get());
		if (e) {
			ui.question.set(e);
		}
	});

	return (
		<QuizContex.Provider
			value={{
				id: initialQuiz.id,
				quiz,
				props$,
				ui,
				setQuestionUi,
				setQuestionUiAfterDelete,
			}}
		>
			{children}
		</QuizContex.Provider>
	);
};

export default QuizProvider;
