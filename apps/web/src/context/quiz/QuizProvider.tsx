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
		scrollForce: false,
		scrollToQuestion: initialQuiz.questions[n].id,
		showDeleteQuestionAlert: false,
		targetDeleteQuestion: '',
		questionVolatile: initialQuiz.questions[n],
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

	useObserve(ui.question, () => {
		ui.questionVolatile.set({ ...ui.question.get() });
	});

	const setQuestionUi = (id: string) => {
		const question = quiz.questions.get().find((q) => q.id === id);
		if (question) {
			ui.question.set(question);
			ui.questionId.set(question.id);
		}
	};

	const validateVolatileQuestion = () => {
		const q = ui.questionVolatile.get();
		if (q.question.length === 0) {
			ui.questionVolatile.errors[0].set('Es necesaria una pregunta');
		}

		let hasCorrectAnswer = false;

		if (q.questionType === 'TF') {
			hasCorrectAnswer =
				q.correctAnswerTF !== null && q.correctAnswerTF !== undefined;
			if (!hasCorrectAnswer) {
				ui.questionVolatile.errors[2].set(
					'Es necesaria seleccionar la respuesta correcta',
				);
			} else {
				ui.questionVolatile.errors[2].set('');
			}
		} else {
			if (q.answers.filter((ans) => ans.length > 0).length < 2) {
				ui.questionVolatile.errors[1].set(
					'Es necesario al menos dos respuestas',
				);
			} else {
				ui.questionVolatile.errors[1].set('');
			}

			hasCorrectAnswer = q.correctAnswers.some((ans) => ans);
			if (!hasCorrectAnswer) {
				ui.questionVolatile.errors[2].set(
					'Es necesaria al menos una respuesta correcta',
				);
			} else {
				ui.questionVolatile.errors[2].set('');
			}
		}
	};

	const setQuestionUiAfterDelete = () => {
		const index = quiz.questions
			.get()
			.findIndex((q) => q.id === ui.targetDeleteQuestion.get());
		let question = quiz.questions[0].get();
		if (index > 0) {
			question = quiz.questions[index - 1].get();
		}
		ui.question.set(question);
		ui.questionId.set(question.id);
	};

	const openDeleteQuestion = (id: string) => {
		ui.targetDeleteQuestion.set(id);
		ui.showDeleteQuestionAlert.set(true);
	};

	const closeDeleteQuestion = () => {
		ui.showDeleteQuestionAlert.set(false);
	};

	const clearScroll = () => {
		ui.scroll.set(false);
		ui.scrollForce.set(false);
		ui.scrollToQuestion.set('');
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
				setQuestionUiAfterDelete,
				openDeleteQuestion,
				closeDeleteQuestion,
				clearScroll,
				validateVolatileQuestion,
			}}
		>
			{children}
		</QuizContex.Provider>
	);
};

export default QuizProvider;
