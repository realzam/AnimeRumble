'use client';

import { trpc } from '@/trpc/client/client';
import { useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { getQueryKey } from '@trpc/react-query';

import { type QuizDataType, type TypeQuizQueryProps } from '@/types/quizQuery';

import { QuizContex, type UiType } from './QuizContex';

interface Props {
	initialQuiz: QuizDataType;
	children: React.ReactNode;
	index: number;
}

const QuizProvider = ({ children, initialQuiz, index }: Props) => {
	let n = 0;
	if (index >= 0 && index < initialQuiz.questions.length) {
		n = index;
	}

	const utils = trpc.useUtils();

	const ui = useObservable<UiType>({
		questionId: initialQuiz.questions[n].id,
		question: initialQuiz.questions[n],
		isDragging: false,
		scroll: n > 0,
		scrollToQuestion: initialQuiz.questions[n].id,
	});

	const quiz = useObservable<QuizDataType>(initialQuiz);
	const query$ = useObservableQuery({
		queryKey: getQueryKey(trpc.quizz.getQuizz, { id: initialQuiz.id }, 'query'),
		queryFn: () =>
			utils.client.quizz.getQuizz
				.query({ id: initialQuiz.id })
				.then((res: QuizDataType) => res)
				.catch(),
		initialData: initialQuiz,
	});
	const props = useObservable<TypeQuizQueryProps>(() => {
		const q = query$.get();
		const { data: _, ...opt } = q;
		return opt;
	});

	useObserve(query$, () => {
		const q = query$.get();
		const { data, ...opt } = q;
		if (data) {
			quiz.set(data);
		}
		props.set(opt);
	});

	const setQuestionUi = (id: string) => {
		const question = quiz.questions.get().find((q) => q.id === id);
		if (question) {
			ui.question.set(question);
			ui.questionId.set(question.id);
		}
	};

	return (
		<QuizContex.Provider
			value={{
				id: initialQuiz.id,
				quiz,
				props,
				ui,
				//functions
				setQuestionUi,
			}}
		>
			{children}
		</QuizContex.Provider>
	);
};

export default QuizProvider;
