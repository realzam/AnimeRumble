'use client';

import { createContext, useContext } from 'react';
import { trpc } from '@/trpc/client/client';
import { type serverClient } from '@/trpc/client/serverClient';
import { type Observable, type ObservableObject } from '@legendapp/state';
import { Memo, useObservable } from '@legendapp/state/react';

import { Button } from '@/components/ui/Button';

type QuizDataType = Awaited<ReturnType<typeof serverClient.quizz.getQuizz>>;
interface Props {
	initialQuiz: QuizDataType;
}

interface State {
	id: Observable<string>;
	title: Observable<string>;
	questionsNumber: Observable<number>;
	counter: Observable<number>;
	refetch: () => Promise<void>;
	quiz: ObservableObject<QuizDataType>;
}

const QuizProvier = createContext<State | null>(null);
const QuizCounterButtons = () => {
	const { counter } = useQuiz();
	return (
		<div>
			<Button
				onClick={() => {
					counter.set((v) => v - 1);
				}}
			>
				-1
			</Button>
			<Button
				onClick={() => {
					counter.set(0);
				}}
			>
				0
			</Button>
			<Button
				onClick={() => {
					counter.set((v) => v + 1);
				}}
			>
				+1
			</Button>
		</div>
	);
};
const QuizCounter = () => {
	const { counter } = useQuiz();
	return (
		<div>
			counter:<Memo>{counter}</Memo>
		</div>
	);
};
const QuizTitle = () => {
	const { quiz } = useQuiz();
	return (
		<div>
			title:<Memo>{quiz.title}</Memo>
		</div>
	);
};

const QuizNumberQuestions = () => {
	const { questionsNumber } = useQuiz();
	return (
		<div>
			questions:<Memo>{questionsNumber}</Memo>
		</div>
	);
};

const QuizAddQuestion = () => {
	const { id, refetch } = useQuiz();
	const addQuestion = trpc.quizz.addQuestion.useMutation();

	return (
		<Button
			onClick={() => {
				addQuestion.mutate(
					{
						id: id.get(),
					},
					{
						async onSuccess(data) {
							console.log('onSuccess', data);
							await refetch();
						},
					},
				);
			}}
		>
			Add question
		</Button>
	);
};

const QuizContainer = () => {
	return (
		<div className='flex flex-col gap-2'>
			<QuizCounter />
			<QuizCounterButtons />
			<QuizTitle />
			<QuizNumberQuestions />
			<QuizAddQuestion />
		</div>
	);
};

const useQuiz = () => useContext(QuizProvier)!;
const QuizPage = ({ initialQuiz }: Props) => {
	const counter = useObservable(0);
	const id = useObservable(initialQuiz.id);
	const title = useObservable(initialQuiz.title);
	const questionsNumber = useObservable(initialQuiz.questions.length);
	const quiz = useObservable(initialQuiz);
	const { refetch: getQuizzRefetch } = trpc.quizz.getQuizz.useQuery(
		{
			id: id.get(),
		},
		{
			initialData: initialQuiz,
		},
	);

	const refetch = async () => {
		const res = await getQuizzRefetch();
		if (res.data) {
			console.log('res', res.data);
			questionsNumber.set(res.data.questions.length);
			quiz.set(res.data);
		}
	};

	// useSelector(() => {
	// 	// console.log('useSelector', data);
	// 	// refetch();
	// 	return data;
	// });
	return (
		<QuizProvier.Provider
			value={{
				id,
				title,
				questionsNumber,
				counter,
				refetch,
				quiz,
			}}
		>
			<Memo>{() => <QuizContainer />}</Memo>
		</QuizProvier.Provider>
	);
};

export default QuizPage;
