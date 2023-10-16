import { trpc } from '@/trpc/client/client';
import { type Observable } from '@legendapp/state';
import { useObservable, useObserve, useSelector } from '@legendapp/state/react';

import { QuizContext, type TypeResultData } from './QuizContext';

type TypeQuestion = TypeResultData['questions'][0];

export interface QuizState {
	quiz: TypeResultData;
	indexQuestionUI: Observable<number>;
	questionUI: TypeQuestion;
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
		},
	);
	const quiz = useSelector(() => data);
	const index = useObservable(0);
	const questionUI = useSelector<TypeQuestion>(
		() => quiz.questions[index.get()],
	);

	useObserve(() => {
		console.log('QuizProvider', index.get());
	});
	return (
		<QuizContext.Provider
			value={{
				refetch,
				quiz,
				questionUI,
				indexQuestionUI: index,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};
