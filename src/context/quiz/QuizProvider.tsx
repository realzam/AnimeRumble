import { trpc } from '@/trpc/client/client';
import { type Observable } from '@legendapp/state';
import { useObservable, useSelector } from '@legendapp/state/react';

import { QuizContext, type TypeResultData } from './QuizContext';

type TypeQuestion = TypeResultData['questions'][0];

export interface QuizState {
	quiz: TypeResultData;
	questionUI: TypeQuestion;
	indexQuestionUI: Observable<number>;
	valueQuestion: Observable<string>;
	typeQuestion: Observable<'Multiple' | 'TF'>;
}

interface Props {
	children: JSX.Element | JSX.Element[];
	initialQuiz: TypeResultData;
}

export const QuizProvider = ({ children, initialQuiz }: Props) => {
	const { refetch, data } = trpc.quizz.getQuizz.useQuery(
		{ id: initialQuiz.id },
		{
			initialData: initialQuiz,
			// refetchInterval: 3000,
		},
	);
	const quiz = useSelector(() => data);
	const index = useObservable(0);
	const questionUI = useSelector<TypeQuestion>(
		() => quiz.questions[index.get()],
	);
	const valueQuestion = useObservable(questionUI.question);
	const typeQuestion = useObservable(questionUI.questionType);
	const setIndexQuestionUI = (i: number) => {
		console.log(
			'setIndexQuestionUI',
			i,
			quiz.questions[i].question,
			quiz.questions[i].questionType,
		);

		index.set(i);
		valueQuestion.set(quiz.questions[i].question);
		typeQuestion.set(quiz.questions[i].questionType);
	};

	return (
		<QuizContext.Provider
			value={{
				refetch,
				quiz,
				questionUI,
				indexQuestionUI: index,
				valueQuestion,
				setIndexQuestionUI,
				typeQuestion,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};
