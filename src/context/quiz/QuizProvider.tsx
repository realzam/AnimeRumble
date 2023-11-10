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
}

type QQ = UseBaseQueryResult<QuizDataType, unknown>;

const QuizProvider = ({ children, initialQuiz }: Props) => {
	const utils = trpc.useUtils();
	const ui = useObservable<UiType>({
		questionId: initialQuiz.questions[0].id,
		question: initialQuiz.questions[0],
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
			ui.set({
				question,
				questionId: question.id,
			});
		}
	};
	const setQuestionUiAfterDelete = (id: string) => {
		const delQ = quiz.questions.get().find((q) => q.id === id);
		console.log('setQuestionUiAfterDelete - info', id, ui.questionId.get());

		console.log(
			'setQuestionUiAfterDelete - info',
			delQ?.question,
			ui.question.question.get(),
		);

		if (id !== ui.questionId.get()) {
			console.log('setQuestionUiAfterDelete - omit');

			return;
		}

		const index = quiz.questions.get().findIndex((q) => q.id === id);
		let question = quiz.questions[0].get();
		if (index !== -1) {
			question = quiz.questions[index].get();
		}
		console.log('setQuestionUiAfterDelete - question', index);
		ui.set({
			question,
			questionId: question.id,
		});
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
